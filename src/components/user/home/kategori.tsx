"use client";
import { motion } from "framer-motion";

export function CategoryList({
  onSelectCategory = () => {}, // <-- FIX: default function
}: {
  onSelectCategory?: (cat: string) => void;
}) {
  const categories = ["Semua", "Novel", "Teknologi", "Bisnis", "Sains", "Edukasi", "Sejarah"];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-black dark:text-[#FFC248]">
        Kategori
      </h3>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            onClick={() => onSelectCategory(cat)}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[var(--color-primary)] dark:bg-white/[0.03] text-black dark:text-[#FFC248] rounded-full shadow-sm whitespace-nowrap"
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
