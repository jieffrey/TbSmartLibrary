"use client";

import { useEffect, useState } from "react";
import { BookCard } from "./card";

export function PopularBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books?limit=3")
      .then((res) => res.json())
      .then((result) => {
        // result = { data: [...] }
        setBooks(result.data || []); // pastikan array
      })
      .catch((err) => {
        console.error("FETCH BOOK ERROR:", err);
      });
  }, []);

  console.log("BOOKS RESULT:", books);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-black dark:text-[#FFC248]">
        Buku Populer Minggu Ini
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        {books.map((b) => (
          <BookCard key={b.id} data={b} />
        ))}
      </div>
    </div>
  );
}
