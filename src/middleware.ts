import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  // Skip middleware untuk public routes
  if (path === "/full-width-pages/auth/signin" || path.startsWith("/api/auth")) {
    return res;
  }

  const isProtected = path.startsWith("/admin") || path.startsWith("/user");

  if (!isProtected) {
    return res;
  }

  try {
    const supabase = await createServerSupabaseClient();
    
    // CEK SESSION DARI SUPABASE (bukan JWT!)
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Kalau gak ada session, redirect ke login
    if (!session) {
      return NextResponse.redirect(new URL("/full-width-pages/auth/signin", req.url));
    }

    // Ambil role dari profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!profile) {
      return NextResponse.redirect(new URL("/full-width-pages/auth/signin", req.url));
    }

    // Check role-based access
    if (path.startsWith("/admin") && profile.role !== "admin") {
      return NextResponse.redirect(new URL("/user", req.url));
    }

    if (path.startsWith("/user") && profile.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/full-width-pages/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};