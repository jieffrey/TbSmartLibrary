import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import crypto from "crypto"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const url = new URL(req.url)
    const limit = url.searchParams.get("limit")

    let query = supabase.from("books").select("*").order("created_at", {
      ascending: false,
    })

    if (limit) {
      query = query.limit(Number(limit))
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionData.session.user.id)
      .single()

    if (profile?.role !== "admin")
      return NextResponse.json({ error: "Admin only" }, { status: 403 })

    const body = await req.json()

    if (!body.judul)
      return NextResponse.json({ error: "Judul required" }, { status: 400 })

    const payload = {
      ...body,
      qr_code: crypto
        .createHash("md5")
        .update(body.judul + Date.now().toString())
        .digest("hex"),
      stok: body.stok || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("books")
      .insert(payload)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }
}

