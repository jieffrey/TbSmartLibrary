// /api/peminjaman/aktif/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { data, error } = await supabase
      .from("peminjaman")
      .select(`
        id,
        tanggal_pinjam,
        batas_kembali,
        books:book_id ( id, judul, penulis, image_url )
      `)
      .eq("user_id", session.user.id)
      .eq("status", "dipinjam");

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
