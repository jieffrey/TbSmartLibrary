// // /lib/books/actions.ts
// "use server"

// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import crypto from "crypto"
// import { isAdmin } from "./role"

// // CREATE
// export async function createBook(bookData: any) {
//   if (!(await isAdmin())) {
//     return { success: false, error: "Unauthorized: Admin only" }
//   }

//   const supabase = await createServerSupabaseClient()

//   const qr_token = crypto
//     .createHash("md5")
//     .update(bookData.judul + Date.now().toString())
//     .digest("hex")

//   const payload = {
//     ...bookData,
//     qr_code: qr_token,
//     stok: bookData.stok || 0,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   }

//   const { data, error } = await supabase
//     .from("books")
//     .insert(payload)
//     .select()
//     .single()

//   if (error) return { success: false, error: error.message }

//   return { success: true, data }
// }

// // UPDATE
// export async function updateBook(id: number, bookData: any) {
//   if (!(await isAdmin())) {
//     return { success: false, error: "Unauthorized: Admin only" }
//   }

//   const supabase = await createServerSupabaseClient()

//   const payload = {
//     ...bookData,
//     updated_at: new Date().toISOString(),
//   }

//   const { data, error } = await supabase
//     .from("books")
//     .update(payload)
//     .eq("id", id)
//     .select()
//     .single()

//   if (error) return { success: false, error: error.message }

//   return { success: true, data }
// }

// // DELETE
// export async function deleteBook(id: number) {
//   if (!(await isAdmin())) {
//     return { success: false, error: "Unauthorized: Admin only" }
//   }

//   const supabase = await createServerSupabaseClient()

//   const { error } = await supabase.from("books").delete().eq("id", id)

//   if (error) return { success: false, error: error.message }

//   return { success: true }
// }

// // GET ALL
// export async function getAllBooks() {
//   const supabase = await createServerSupabaseClient()

//   const { data, error } = await supabase
//     .from("books")
//     .select("*")
//     .order("created_at", { ascending: false })

//   if (error) return { success: false, error: error.message }

//   return { success: true, data }
// }

// // GET BY ID
// export async function getBookById(id: number) {
//   const supabase = await createServerSupabaseClient()

//   const { data, error } = await supabase
//     .from("books")
//     .select("*")
//     .eq("id", id)
//     .single()

//   if (error) return { success: false, error: error.message }

//   return { success: true, data }
// }
