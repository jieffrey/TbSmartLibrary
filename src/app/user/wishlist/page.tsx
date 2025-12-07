"use client";

import WishlistList from "@/components/user/wishlist/list";
import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      setLoading(true);
      
      const response = await fetch('/api/wishlist/list');
      const result = await response.json();

      console.log("Wishlist API result:", result);

      if (response.ok && result.data) {
        // Transform data untuk komponen
        const transformed = result.data
          .filter((item: any) => item.books) // Filter out items without books data
          .map((item: any) => ({
            id: item.id,
            book_id: item.books?.id || 0,
            title: item.books?.judul || 'Judul tidak tersedia',
            author: item.books?.penulis || 'Penulis tidak diketahui',
            year: item.books?.tahun_terbit || '-',
            cover: item.books?.image_url,
            stok: item.books?.stok || 0,
            kategori: item.books?.kategori || 'Umum',
          }));
        
        console.log("Transformed wishlist:", transformed);
        setWishlist(transformed);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
      alert("Gagal memuat wishlist");
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(wishlistId: number, bookId: number) {
    try {
      const response = await fetch('/api/wishlist/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id: bookId }),
      });

      if (response.ok) {
        // Update state
        setWishlist(wishlist.filter((b) => b.id !== wishlistId));
        alert("Buku dihapus dari wishlist");
      } else {
        const result = await response.json();
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Terjadi kesalahan");
    }
  }

  function borrowBook(book: any) {
    // Redirect ke halaman detail buku
      redirect(`/user/book/${book.book_id}`);
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-5 md:p-8">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          Buku Favorit Saya
        </h1>
        <div className="text-center text-muted-foreground mt-20 text-lg">
          Memuat wishlist...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-5 md:p-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Buku Favorit Saya
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-muted-foreground mt-20">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-lg mb-2">Wishlist kosong</p>
          <p className="text-sm">
            Kamu belum menambahkan buku ke wishlist.
          </p>
          <button
            onClick={() => redirect('/user/books')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Jelajahi Buku
          </button>
        </div>
      ) : (
        <WishlistList
          items={wishlist}
          onRemove={removeFromWishlist}
          onBorrow={borrowBook}
        />
      )}
    </div>
  );
}