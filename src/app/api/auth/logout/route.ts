import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();

    return NextResponse.json(
      { message: "Logout berhasil!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Logout gagal" },
      { status: 500 }
    );
  }
}