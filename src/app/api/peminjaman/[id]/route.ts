// /api/peminjaman/[id]/route.ts
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

export async function GET(req: NextRequest, { params }: any) {
  try {
    const supabase = await createServerSupabaseClient();
    const { id } = params;

    const { data, error } = await supabase
      .from("peminjaman")
      .select(`
        *,
        profiles:user_id ( nama ),
        books:book_id ( judul )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const supabase = await createServerSupabaseClient();
    const is_admin = await isAdmin(supabase);
    if (!is_admin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const body = await req.json();
    const { status, keterangan } = body;

    const { id } = params;

    const { data, error } = await supabase
      .from("peminjaman")
      .update({
        status,
        keterangan,
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

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const supabase = await createServerSupabaseClient();
    const is_admin = await isAdmin(supabase);
    if (!is_admin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { id } = params;

    const { error } = await supabase
      .from("peminjaman")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
