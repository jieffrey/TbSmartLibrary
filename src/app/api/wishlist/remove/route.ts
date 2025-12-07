// app/api/wishlist/remove/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function DELETE(req: Request) {
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

    // Remove from wishlist
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", session.user.id)
      .eq("book_id", book_id);

    if (error) {
      console.error("Delete wishlist error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: "Buku berhasil dihapus dari wishlist"
    });
    
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}