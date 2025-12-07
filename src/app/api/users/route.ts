"use server"

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export type User = {
  id: string
  email?: string
  nama?: string // ✅ Sesuai dengan schema database
  kelas?: string
  role?: 'admin' | 'user'
  created_at?: string
  updated_at?: string
}

async function isAdmin() {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return false
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()
  
  return profile?.role === 'admin'
}

export async function getAllUsers() {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized: Admin only' }
    }

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: data as User[] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getUserById(id: string) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized: Admin only' }
    }

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: data as User }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function updateUser(id: string, userData: Partial<User>) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized: Admin only' }
    }

    const supabase = await createServerSupabaseClient()
    
    const payload = {
      ...userData,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}`)
    
    return { success: true, data: data as User }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteUser(id: string) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized: Admin only' }
    }

    const supabase = await createServerSupabaseClient()
    
    // Get current user to prevent self-deletion
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user.id === id) {
      return { success: false, error: 'Tidak bisa menghapus akun sendiri' }
    }

    // ✅ Note: Deleting from profiles will cascade delete auth.users due to foreign key
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/users')
    
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function toggleUserRole(id: string) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized: Admin only' }
    }

    const supabase = await createServerSupabaseClient()
    
    // Get current user to prevent changing own role
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user.id === id) {
      return { success: false, error: 'Tidak bisa mengubah role sendiri' }
    }

    // Get current role
    const { data: user, error: fetchError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', id)
      .single()

    if (fetchError) {
      return { success: false, error: fetchError.message }
    }

    const newRole = user?.role === 'admin' ? 'user' : 'admin'

    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}`)
    
    return { success: true, data: data as User }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ✅ Tambahan: Get user history (peminjaman)
export async function getUserHistory(userId: string) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized: Admin only' }
    }

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('peminjaman')
      .select(`
        *,
        books:book_id (
          id,
          judul,
          penulis,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function createUser(data: {
  nama: string;
  email: string;
  kelas?: string;
  password: string;
  role: "admin" | "user";
}) {
  try {
    // 1. Cek apakah user yang memanggil adalah admin
    const admin = await isAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized: Admin only' }
    }

    // 2. ✅ Gunakan admin client untuk membuat user auth
    const supabaseAdmin = createAdminClient()
    
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        role: data.role,
        nama: data.nama,
        kelas: data.kelas
      }
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { success: false, error: authError.message }
    }
    
    if (!authUser.user) {
      return { success: false, error: "User auth gagal dibuat" }
    }

    const userId = authUser.user.id

    // 3. Insert ke table profiles (masih pakai admin client untuk consistency)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: userId,
        nama: data.nama,
        email: data.email,
        kelas: data.kelas || null,
        role: data.role
      })

    if (profileError) {
      console.error("Profile error:", profileError)
      
      // Rollback: hapus auth user jika insert profile gagal
      await supabaseAdmin.auth.admin.deleteUser(userId)
      
      return { success: false, error: profileError.message }
    }

    // 4. Revalidate halaman
    revalidatePath('/admin/users')
    revalidatePath('/admin/dashboard/users')

    return { success: true, id: userId }
    
  } catch (err: any) {
    console.error("Create user error:", err)
    return { 
      success: false, 
      error: err.message || "Terjadi kesalahan saat membuat user" 
    }
  }
}