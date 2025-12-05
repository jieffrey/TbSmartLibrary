import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await req.json();

    const { code } = body;
    if (!code) {
      return NextResponse.json(
        { error: "QR code tidak ditemukan" },
        { status: 400 }
      );
    }

    // QR harus berupa JSON string → parse
    let data;
    try {
      data = JSON.parse(code);
    } catch (err) {
      return NextResponse.json(
        { error: "QR code tidak valid" },
        { status: 400 }
      );
    }

    const borrowId = data.borrow_id;
    if (!borrowId) {
      return NextResponse.json(
        { error: "borrow_id tidak ditemukan di QR" },
        { status: 400 }
      );
    }

    // Update status peminjaman
    const { data: updated, error } = await supabase
      .from("borrow")
      .update({
        status: "borrowed",          // buku resmi dipinjam
        scanned_at: new Date().toISOString(),
      })
      .eq("id", borrowId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Gagal update status peminjaman" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, borrow: updated });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
