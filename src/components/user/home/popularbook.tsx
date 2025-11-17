"use client";
import BookCard from "../../../components/user/home/card";

const dummyPopular = [
  { id: 1, title: "Atomic Habits", cover: "/books/atomic.png" },
  { id: 2, title: "The Psychology of Money", cover: "/books/money.png" },
  { id: 3, title: "How Innovation Works", cover: "/books/innovation.png" }
];

export default function PopularBooks() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#294B29] dark:text-[#D2E3C8]">
        Buku Populer Minggu Ini
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        {dummyPopular.map((b) => (
          <BookCard key={b.id} data={b} />
        ))}
      </div>
    </div>
  );
}
