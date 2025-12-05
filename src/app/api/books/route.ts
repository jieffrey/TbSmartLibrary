// /api/books/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'
import crypto from 'crypto'

async function isAdmin(supabaseClient: ReturnType<typeof createServerSupabaseClient> extends Promise<infer R> ? R : any) {
  const { data: { session } } = await supabaseClient.auth.getSession()
  if (!session) return false
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()
  return profile?.role === 'admin'
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const url = new URL(req.url)
    const q = url.searchParams.get('q') || ''
    const kategori = url.searchParams.get('kategori') || ''
    const tersedia = url.searchParams.get('tersedia') // '1' or 'true'
    const page = Number(url.searchParams.get('page') || '1')
    const limit = Number(url.searchParams.get('limit') || '20')
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase.from('books').select('*')

    if (q) {
      query = query.ilike('judul', `%${q}%`).or(`penulis.ilike.%${q}%`)
    }
    if (kategori) {
      query = query.eq('kategori', kategori)
    }
    if (tersedia === '1' || tersedia === 'true') {
      query = query.gt('stok', 0)
    }

    const { data, error, count } = await query.range(from, to).order('created_at', { ascending: false }).limit(limit)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // total count may not be returned unless using .select('*, count') pattern; for simplicity not returning total
    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const admin = await isAdmin(supabase)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    const body = await req.json()
    // expected fields: judul, penulis, penerbit, tahun_terbit, kategori, stok, image_url, shelf_location (optional)
    const {
      judul,
      penulis,
      penerbit,
      tahun_terbit,
      kategori,
      stok = 0,
      image_url = null,
      shelf_location = null
    } = body

    if (!judul) return NextResponse.json({ error: 'judul is required' }, { status: 400 })

    // generate qr_code token
    const token = crypto.createHash('md5').update(judul + Date.now().toString()).digest('hex')

    const payload: any = {
      judul,
      penulis,
      penerbit,
      tahun_terbit,
      kategori,
      stok,
      image_url,
      qr_code: token,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // if shelf_location column exists
    if ('shelf_location' in body) payload.shelf_location = shelf_location
    if ('rack_id' in body) payload.rack_id = body.rack_id

    const { data, error } = await supabase.from('books').insert(payload).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
