"use client";

import WishlistList from "@/components/user/wishlist/list";
import { useState } from "react";

export default function WishlistPage() {
  // Dummy example → nanti tinggal ganti data dari Supabase
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      year: "2018",
      cover: "/atomic.jpg",
    },
    {
      id: 2,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      year: "2020",
      cover: "/psychology.jpg",
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((b) => b.id !== id));
  };

  const borrowBook = (book: any) => {
    alert("Pinjam buku: " + book.title);
    // nanti diarahkan ke halaman QR / konfirmasi pinjam
  };

  return (
    <div className="max-w-5xl mx-auto p-5 md:p-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Buku Favorit Saya
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-muted-foreground mt-20 text-lg">
          Kamu belum menambahkan buku ke wishlist.
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
