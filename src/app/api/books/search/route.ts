// /api/books/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const url = new URL(req.url)
    const q = url.searchParams.get('q') || ''
    if (!q) return NextResponse.json({ data: [] })

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .ilike('judul', `%${q}%`)
      .limit(50)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
