"use client";
import BookCard from "./card";

export default function BookCatalog({ searchQuery }) {
  // ini nanti dihubungkan ke API / Supabase
  const allBooks = [
    { id: 1, title: "Atomic Habits", cover: "/books/atomic.png" },
    { id: 2, title: "Deep Work", cover: "/books/deep.png" },
    { id: 3, title: "Ego is The Enemy", cover: "/books/ego.png" }
  ];

  const filtered = allBooks.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#294B29] dark:text-[#D2E3C8]">
        Katalog Lengkap
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        {filtered.map((b) => (
          <BookCard key={b.id} data={b} />
        ))}
      </div>
    </div>
  );
}
