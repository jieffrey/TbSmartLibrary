// app/api/wishlist/add/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await req.json();

    // Get current user session
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { book_id } = body;

    if (!book_id) {
      return NextResponse.json({ 
        error: "book_id is required" 
      }, { status: 400 });
    }

    // Check if already in wishlist
    const { data: existing, error: checkError } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("book_id", book_id)
      .single();

    if (existing) {
      return NextResponse.json({ 
        error: "Buku sudah ada di wishlist" 
      }, { status: 400 });
    }

    // Add to wishlist
    const { data, error } = await supabase
      .from("wishlist")
      .insert({
        user_id: session.user.id,
        book_id: parseInt(book_id, 10)
      })
      .select()
      .single();

    if (error) {
      console.error("Insert wishlist error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: "Buku berhasil ditambahkan ke wishlist",
      data 
    });
    
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}