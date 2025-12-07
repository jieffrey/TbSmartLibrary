import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("denda")
      .select(`
        id,
        jumlah,
        hari_terlambat,
        status,
        peminjaman (
          id,
          books (
            judul,
            penulis
          )
        )
      `)
      .eq("status", "belum bayar")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
