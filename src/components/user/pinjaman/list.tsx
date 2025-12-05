"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/badge/Badge";

export default function BorrowedList({ items = [] }: { items?: any[] }) {
  const now = new Date();
  const dendaPerHari = 1000;

  // Jika items bukan array, fallback jadi array kosong
  const data = Array.isArray(items) ? items : [];

  return (
    <div className="grid gap-4">
      {data.map((book, i) => {
        const due = new Date(book.dueDate);
        const borrowed = new Date(book.borrowedDate);

        const isLate = due < now;
        const lateDays = isLate
          ? Math.ceil((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
          : 0;

        const fine = lateDays * dendaPerHari;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow border dark:border-slate-700"
          >
            {/* Judul Buku */}
            <h3 className="font-bold text-lg text-black dark:text-white">
              {book.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">{book.author}</p>

            {/* Tanggal */}
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Dipinjam: {borrowed.toLocaleDateString("id-ID")}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Jatuh Tempo: {due.toLocaleDateString("id-ID")}
            </p>

            {/* Badge */}
            <div className="mt-3">
              <Badge
                className={`text-white px-3 py-1 rounded-md ${
                  isLate ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {isLate ? "Terlambat" : "Tepat Waktu"}
              </Badge>
            </div>

            {/* Denda */}
            {isLate && (
              <p className="mt-3 text-red-500 font-semibold">
                Denda: Rp {fine.toLocaleString("id-ID")}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
