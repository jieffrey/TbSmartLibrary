import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check auth (admin only)
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    // Parse QR payload
    const payload = await req.json();
    const { type, user_id, book_id, batas_kembali } = payload;

    console.log("QR Scan payload:", payload);

    if (type === "borrow") {
      // Update peminjaman status dari "menunggu" ke "dipinjam"
      const { data: peminjaman, error: peminjamanError } = await supabase
        .from("peminjaman")
        .select("*")
        .eq("user_id", user_id)
        .eq("book_id", book_id)
        .eq("status", "menunggu")
        .maybeSingle();

      if (peminjamanError || !peminjaman) {
        return NextResponse.json({ 
          error: "Peminjaman tidak ditemukan atau sudah diproses" 
        }, { status: 404 });
      }

      // Update status ke "dipinjam"
      const { error: updateError } = await supabase
        .from("peminjaman")
        .update({ 
          status: "dipinjam",
          tanggal_pinjam: new Date().toISOString(),
        })
        .eq("id", peminjaman.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      // Update stok buku (kurangi 1)
      const { data: book } = await supabase
        .from("books")
        .select("stok")
        .eq("id", book_id)
        .single();

      if (book && book.stok > 0) {
        await supabase
          .from("books")
          .update({ stok: book.stok - 1 })
          .eq("id", book_id);
      }

      return NextResponse.json({ 
        success: true,
        message: "Peminjaman berhasil dikonfirmasi!",
        data: peminjaman
      });
    }

    return NextResponse.json({ error: "Invalid QR type" }, { status: 400 });

  } catch (error: any) {
    console.error("Scan API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}