"use server"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
            })
          } catch (err) {
            // Next.js Server Components don't allow writing cookies here
          }
        },
        remove(name: string, options) {
          try {
            cookieStore.set({
              name,
              value: '',
              ...options,
            })
          } catch (err) {
            // Ignored
          }
        },
      },
    }
  )
}
