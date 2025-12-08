// app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import crypto from "crypto"

// ===== GET ALL BOOKS =====
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const url = new URL(req.url)
    
    // Query params
    const limit = url.searchParams.get("limit")
    const kategori = url.searchParams.get("kategori")
    const search = url.searchParams.get("search")

    // ✅ Include relasi rack untuk menampilkan lokasi rak
    let query = supabase
      .from("books")
      .select(`
        id,
        judul,
        penulis,
        penerbit,
        tahun_terbit,
        image_url,
        kategori,
        stok,
        qr_code,
        rack_id,
        created_at,
        updated_at,
        rack:rack_id (
          kode,
          deskripsi
        )
      `)
      .order("created_at", { ascending: false })

    // Filter by kategori
    if (kategori && kategori !== "Semua") {
      query = query.eq("kategori", kategori)
    }

    // Search by judul or penulis
    if (search) {
      query = query.or(`judul.ilike.%${search}%,penulis.ilike.%${search}%`)
    }

    // Limit results
    if (limit) {
      query = query.limit(Number(limit))
    }

    const { data, error } = await query
    
    if (error) {
      console.error("Supabase GET error:", error)
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error("API GET Error:", err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Terjadi kesalahan saat mengambil data buku" 
    }, { status: 500 })
  }
}

// ===== CREATE NEW BOOK =====
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // 1. Validasi authentication
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized - Silakan login terlebih dahulu" 
      }, { status: 401 })
    }

    // 2. Validasi role admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionData.session.user.id)
      .single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ 
        success: false,
        error: "Forbidden - Hanya admin yang dapat menambah buku" 
      }, { status: 403 })
    }

    // 3. Parse request body
    const body = await req.json()

    // 4. Validasi required fields
    const requiredFields = ["judul", "penulis", "kategori"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ 
          success: false,
          error: `Field '${field}' wajib diisi` 
        }, { status: 400 })
      }
    }

    // 5. Generate QR code unik
    const qrCode = crypto
      .createHash("md5")
      .update(body.judul + Date.now().toString())
      .digest("hex")

    // 6. Prepare payload
    const payload = {
      judul: body.judul.trim(),
      penulis: body.penulis.trim(),
      penerbit: body.penerbit?.trim() || null,
      tahun_terbit: body.tahun_terbit || new Date().getFullYear(),
      image_url: body.image_url?.trim() || null,
      kategori: body.kategori.trim(),
      stok: body.stok || 1,
      rack_id: body.rack_id || null,
      qr_code: qrCode,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // 7. Insert to database
    const { data, error } = await supabase
      .from("books")
      .insert(payload)
      .select(`
        *,
        rack:rack_id (
          kode,
          deskripsi
        )
      `)
      .single()

    if (error) {
      console.error("Supabase INSERT error:", error)
      throw error
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: "Buku berhasil ditambahkan"
    }, { status: 201 })

  } catch (err: any) {
    console.error("API POST Error:", err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Gagal menambahkan buku" 
    }, { status: 500 })
  }
}

// ===== UPDATE BOOK =====
export async function PUT(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Validasi auth
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 })
    }

    // Validasi admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionData.session.user.id)
      .single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ 
        success: false,
        error: "Forbidden - Admin only" 
      }, { status: 403 })
    }

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ 
        success: false,
        error: "Book ID is required" 
      }, { status: 400 })
    }

    const payload = {
      ...updateData,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from("books")
      .update(payload)
      .eq("id", id)
      .select(`
        *,
        rack:rack_id (
          kode,
          deskripsi
        )
      `)
      .single()

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      data,
      message: "Buku berhasil diupdate"
    })

  } catch (err: any) {
    console.error("API PUT Error:", err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Gagal mengupdate buku" 
    }, { status: 500 })
  }
}

// ===== DELETE BOOK =====
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Validasi auth
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 })
    }

    // Validasi admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionData.session.user.id)
      .single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ 
        success: false,
        error: "Forbidden - Admin only" 
      }, { status: 403 })
    }

    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ 
        success: false,
        error: "Book ID is required" 
      }, { status: 400 })
    }

    // Check if book has active loans
    const { data: activeLoans } = await supabase
      .from("peminjaman")
      .select("id")
      .eq("book_id", id)
      .in("status", ["dipinjam", "menunggu"])

    if (activeLoans && activeLoans.length > 0) {
      return NextResponse.json({ 
        success: false,
        error: "Tidak dapat menghapus buku yang sedang dipinjam" 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ 
      success: true,
      message: "Buku berhasil dihapus"
    })

  } catch (err: any) {
    console.error("API DELETE Error:", err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || "Gagal menghapus buku" 
    }, { status: 500 })
  }
}