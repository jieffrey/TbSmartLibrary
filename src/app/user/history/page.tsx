"use client";

import HistoryList from "@/components/user/history/list";
import { useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([
    {
      id: 1,
      book: "Atomic Habits",
      author: "James Clear",
      borrowDate: "12 Jan 2025",
      returnDate: "19 Jan 2025",
      status: "on-time",
      fine: 0,
    },
    {
      id: 2,
      book: "The Psychology of Money",
      author: "Morgan Housel",
      borrowDate: "1 Feb 2025",
      returnDate: "8 Feb 2025",
      status: "late",
      fine: 5000,
    },
  ]);

  const openDetail = (item: any) => {
    alert("Detail transaksi: " + item.book);
    // nanti diarahkan ke modal / halaman detail
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        📘 History Peminjaman
      </h1>

      {history.length === 0 ? (
        <div className="text-center text-muted-foreground text-lg mt-20">
          Belum ada riwayat peminjaman.
        </div>
      ) : (
        <HistoryList items={history} onDetail={openDetail} />
      )}
    </div>
  );
}
