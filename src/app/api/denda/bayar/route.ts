import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { denda_id, metode } = body;

    if (!denda_id || !metode) return NextResponse.json({ error: "denda_id & metode required" }, { status: 400 });

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("denda")
      .update({
        status: "lunas",
        confirmed_by: null,
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", denda_id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
