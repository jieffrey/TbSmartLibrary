// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createServerSupabaseClient } from '../supabase/server'

// // Type definitions
// type SignInResult = {
//   success: boolean
//   message: string
//   error?: string
// }

// // LOGIN - Server Action
// export async function signIn(email: string, password: string): Promise<SignInResult> {
//   const supabase = await createServerSupabaseClient()

//   // Validasi input
//   if (!email || !password) {
//     return {
//       success: false,
//       message: 'Email dan password wajib diisi',
//     }
//   }

//   // Login ke Supabase
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })

//   if (error) {
//     return {
//       success: false,
//       message: 'Email atau password salah',
//       error: error.message,
//     }
//   }

//   // Ambil profile user
//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', data.user.id)
//     .single()

//   // Refresh path & redirect berdasarkan role
//   revalidatePath('/', 'layout')
  
//   if (profile?.role === 'admin') {
//     redirect('/admin')
//   } else {
//     redirect('/dashboard')
//   }
// }

// // LOGOUT - Server Action
// export async function signOut() {
//   const supabase = await createServerSupabaseClient()
//   await supabase.auth.signOut()
//   revalidatePath('/', 'layout')
//   redirect('/')
// }

// // GET CURRENT USER - Server function
// export async function getCurrentUser() {
//   const supabase = await createServerSupabaseClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   return user
// }

// // GET USER PROFILE - Server function
// export async function getUserProfile() {
//   const supabase = await createServerSupabaseClient()
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) return null

//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', user.id)
//     .single()

//   return profile
// }