// // /lib/books/role.ts
// "use server"

// import { createServerSupabaseClient } from "@/lib/supabase/server"

// // Ambil role user (admin/siswa)
// export async function getSessionRole() {
//   const supabase = await createServerSupabaseClient()
//   const { data: sessionData } = await supabase.auth.getSession()

//   if (!sessionData.session) {
//     return { role: null, userId: null }
//   }

//   const userId = sessionData.session.user.id

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("role")
//     .eq("id", userId)
//     .single()

//   return { role: profile?.role || null, userId }
// }

// // Cek apakah admin
// export async function isAdmin() {
//   const { role } = await getSessionRole()
//   return role === "admin"
// }

// // Optional: cek apakah siswa (kalau butuh)
// export async function isStudent() {
//   const { role } = await getSessionRole()
//   return role === "student"
// }
