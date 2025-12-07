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
        status,
        confirmed_at,
        peminjaman (
          id,
          books (
            judul,
            penulis
          )
        )
      `)
      .eq("status", "lunas")
      .order("confirmed_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
