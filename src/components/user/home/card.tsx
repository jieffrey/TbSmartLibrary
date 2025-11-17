"use client";

import { motion } from "framer-motion";

export default function BookCard({ data }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl overflow-hidden bg-white dark:bg-[#121212] shadow"
    >
      <img
        src={data.cover}
        className="w-full h-40 object-cover"
        alt={data.title}
      />

      <div className="p-3">
        <p className="font-semibold text-[#294B29] dark:text-white">
          {data.title}
        </p>
        <button className="mt-2 w-full bg-[#294B29] text-white py-2 rounded-lg text-sm hover:bg-[#1f3b21]">
          Pinjam
        </button>
      </div>
    </motion.div>
  );
}
    