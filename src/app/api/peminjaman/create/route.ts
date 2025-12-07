import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);
    
    const supabase = await createServerSupabaseClient();
    
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ FIX: Ambil dari session, bukan dari body (security)
    const user_id = session.user.id; 
    const { book_id, batas_kembali } = body;

    if (!book_id || !batas_kembali) {
      return NextResponse.json({ 
        error: "Missing required fields: book_id, batas_kembali" 
      }, { status: 400 });
    }

    const bookIdNumber = parseInt(book_id, 10);

    // CEK: Apakah user sudah punya peminjaman aktif untuk buku ini?
    const { data: existingLoan, error: checkError } = await supabase
      .from("peminjaman")
      .select("id, status")
      .eq("user_id", user_id)
      .eq("book_id", bookIdNumber)
      .in("status", ["menunggu", "dipinjam"])
      .maybeSingle(); // ✅ GANTI .limit(1) jadi .maybeSingle()

    if (checkError) {
      console.error("Check error:", checkError);
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    if (existingLoan) {
      const statusMsg = existingLoan.status === "menunggu" 
        ? "menunggu konfirmasi" 
        : "sedang dipinjam";
      
      return NextResponse.json({ 
        error: `Anda sudah memiliki peminjaman ${statusMsg} untuk buku ini` 
      }, { status: 400 });
    }

    // CEK: Apakah stok buku tersedia?
    const { data: book, error: bookError } = await supabase
      .from("books")
      .select("stok, judul")
      .eq("id", bookIdNumber)
      .single();

    if (bookError || !book) {
      return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });
    }

    if (book.stok <= 0) {
      return NextResponse.json({ 
        error: `Stok buku "${book.judul}" habis` 
      }, { status: 400 });
    }

    // Insert peminjaman baru
    const { data, error } = await supabase
      .from("peminjaman")
      .insert({
        user_id,
        book_id: bookIdNumber,
        batas_kembali,
        status: "menunggu",
        created_at: new Date().toISOString(), // ✅ Tambahkan timestamp
      })
      .select()
      .single();
      
    console.log("Insert result:", { data, error });

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: "Permintaan peminjaman berhasil! Menunggu konfirmasi admin.",
      data 
    });
    
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 