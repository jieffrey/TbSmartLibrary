"use client";

import { useEffect, useState } from "react";
import { BookCard } from "./card";

export default function BookCatalog({ searchQuery }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((result) => setBooks(result.data || [])) // FIX: ambil array
      .catch((err) => console.error("BOOK FETCH ERROR:", err));
  }, []);

  // Pastikan searchQuery aman / tidak undefined
  const q = (searchQuery || "").toLowerCase();

  // Filter berdasarkan judul (atau bisa tambah penulis)
  const filtered = books.filter((b) =>
    b.judul.toLowerCase().includes(q)
  );

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold dark:text-[#FFC248] text-black">
        Katalog Lengkap
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        {books?.map((book) => (
  <BookCard key={book.id} book={book} />
))}


      </div>
    </div>
  );
}
