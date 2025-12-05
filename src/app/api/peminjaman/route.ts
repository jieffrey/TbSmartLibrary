// /api/peminjaman/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

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

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    const admin = await isAdmin(supabase);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("peminjaman")
      .select(`
        id,
        tanggal_pinjam,
        batas_kembali,
        tanggal_kembali,
        status,
        keterangan,
        created_at,
        profiles:user_id ( nama ),
        books:book_id ( judul )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { book_id, batas_kembali, keterangan } = body;

    if (!book_id || !batas_kembali) {
      return NextResponse.json({ error: "book_id & batas_kembali required" }, { status: 400 });
    }

    // insert peminjaman
    const { data, error } = await supabase
      .from("peminjaman")
      .insert({
        user_id: session.user.id,
        book_id,
        batas_kembali,
        keterangan: keterangan || null,
        status: "menunggu",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
