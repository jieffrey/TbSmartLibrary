// /api/peminjaman/overdue/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("peminjaman")
      .select(`
        id,
        batas_kembali,
        tanggal_pinjam,
        profiles:user_id ( nama ),
        books:book_id ( judul )
      `)
      .lt("batas_kembali", new Date().toISOString())
      .eq("status", "dipinjam");

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
