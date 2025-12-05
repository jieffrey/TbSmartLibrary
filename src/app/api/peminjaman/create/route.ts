// app/api/peminjaman/create/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = await createServerSupabaseClient();

  const { user_id, book_id, return_date } = body;

  const { data, error } = await supabase
    .from("borrow")
    .insert({
      user_id,
      book_id,
      return_date,
      status: "pending_user_scan", // awal
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}