"use client";
import { motion } from "framer-motion";

const categories = [
  "Novel", "Teknologi", "Bisnis", "Sains", "Edukasi", "Sejarah"
];

export default function CategoryList() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-[#294B29] dark:text-[#D2E3C8]">
        Kategori
      </h3>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#E8F3E3] dark:bg-[#121212] text-[#294B29] dark:text-white rounded-full whitespace-nowrap shadow-sm"
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
