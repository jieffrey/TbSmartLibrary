import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password harus diisi!" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // LOGIN PAKAI SUPABASE AUTH (bukan JWT manual!)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Ambil profile user untuk role
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { message: "Profile tidak ditemukan" },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json(
      {
        message: "Login berhasil!",
        user: {
          id: data.user.id,
          email: data.user.email,
          role: profile.role,
          nama: profile.nama,
          kelas: profile.kelas,
          phone: profile.phone,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error login:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}