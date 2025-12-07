import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import crypto from 'crypto'

async function isAdmin(supabaseClient: any) {
  const { data: { user } } = await supabaseClient.auth.getUser()  // FIXED
  if (!user) return false

  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return profile?.role === 'admin'
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const bookId = Number(id)

    if (Number.isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", bookId)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // ambil id dari URL
    const body = await req.json();

    const { data, error } = await supabase
      .from("books")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", Number(id))
      .select()
      .single();

    if (error) throw error;

    // Pastikan response berbentuk object { success: true, data }
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("PATCH error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerSupabaseClient()
    const admin = await isAdmin(supabase)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    const { id } = await context.params  // FIX
    const numericId = Number(id)

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    const { error } = await supabase.from('books').delete().eq('id', numericId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

