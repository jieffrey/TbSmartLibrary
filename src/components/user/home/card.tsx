"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function BookCard({ book }: any) {
  const router = useRouter();

  console.log("BOOKCARD RECEIVED", book);
  if (!book) return null

  const handlePinjam = () => {
    router.push(`/user/book/${book.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="bg-white dark:bg-[#181818] rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-neutral-800 overflow-hidden cursor-pointer"
    >
      <div className="w-full h-44 overflow-hidden">
        <img
          src={book.image_url || "/placeholder.png"}
          alt={book.judul}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>

      <div className="p-4">
        <p className="font-semibold text-black dark:text-white text-sm line-clamp-2 leading-snug">
          {book.judul}
        </p>

        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
          {book.penulis}
        </p>

        <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
          Lokasi: {book?.rack?.kode || "-"} ({book?.rack?.deskripsi || "-"})
        </p>

        <button
          onClick={handlePinjam}
          className="mt-3 w-full py-2 rounded-xl text-sm font-medium
          bg-[var(--color-primary)] text-black
          hover:bg-black hover:text-[var(--color-primary)]
          transition-all duration-200
          dark:bg-[#FFC248] dark:text-black
          dark:hover:bg-transparent dark:hover:border dark:border-[#FFC248] dark:hover:text-[#FFC248]">
          Pinjam
        </button>
      </div>
    </motion.div>
  );
}
