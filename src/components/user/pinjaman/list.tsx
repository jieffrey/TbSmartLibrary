"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/badge/Badge";
import { useEffect, useState } from "react";

export default function BorrowedList() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const dendaPerHari = 1000;

  useEffect(() => {
    async function fetchBorrowedBooks() {
      try {
        const response = await fetch('/api/peminjaman/aktif');
        if (response.ok) {
          const result = await response.json();
          setBorrowedBooks(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBorrowedBooks();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  if (borrowedBooks.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        Anda belum meminjam buku apapun.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {borrowedBooks.map((loan: any, i) => {
        const book = loan.books;
        const due = new Date(loan.batas_kembali);
        const borrowed = loan.tanggal_pinjam ? new Date(loan.tanggal_pinjam) : new Date();

        const isLate = due < now;
        const lateDays = isLate
          ? Math.ceil((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
          : 0;

        const fine = lateDays * dendaPerHari;

        return (
          <motion.div
            key={loan.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow border dark:border-slate-700"
          >
            <div className="flex items-center gap-4">
              {/* Book Cover */}
              {book?.image_url && (
                <img
                  src={book.image_url}
                  alt={book.judul}
                  className="w-16 h-20 object-cover rounded-lg border"
                />
              )}
              
              <div className="flex-1">
                {/* Judul Buku */}
                <h3 className="font-bold text-lg text-black dark:text-white">
                  {book?.judul || 'Judul tidak tersedia'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {book?.penulis || 'Penulis tidak tersedia'}
                </p>

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
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
