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


export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerSupabaseClient()
    const admin = await isAdmin(supabase)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    const { id } = await context.params  // FIX
    const numericId = Number(id)

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    console.log("USER:", await supabase.auth.getUser())
    const body = await req.json()

    if (body.regenerate_qr) {
      body.qr_code = crypto.createHash('md5')
        .update(String(id) + Date.now().toString())
        .digest('hex')
    }

    body.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('books')
      .update(body)
      .eq('id', numericId)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
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
