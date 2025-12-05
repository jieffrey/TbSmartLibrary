// /api/peminjaman/kembalikan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function isAdmin(supabase: any) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return false;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  return data?.role === "admin";
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const admin = await isAdmin(supabase);

    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const body = await req.json();
    const { id } = body;

    const now = new Date();

    const { data, error } = await supabase
      .from("peminjaman")
      .update({
        status: "dikembalikan",
        tanggal_kembali: now.toISOString(),
        confirmed_at: now.toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
