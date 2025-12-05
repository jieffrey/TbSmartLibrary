"use client";

import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryCard({ item, onDetail }) {
  // STATUS HANDLING
  const isLate = item.status === "late";
  const isWaiting = item.status === "waiting_admin";
  const isBorrowed = item.status === "borrowed";
  const isReturned = item.status === "returned";

  // LABEL STATUS
  const renderStatus = () => {
    switch (item.status) {
      case "waiting_admin":
        return "Menunggu Konfirmasi Admin";
      case "borrowed":
        return "Dipinjam";
      case "returned":
        return "Dikembalikan";
      case "late":
        return "Terlambat";
      default:
        return "Tidak Diketahui";
    }
  };

  // WARNA STATUS BADGE
  const statusClass = isLate
    ? "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300"
    : isWaiting
    ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    : isBorrowed
    ? "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
    : "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300";

  return (
    <div className="bg-white dark:bg-white/[0.03] border dark:border-zinc-800 p-5 rounded-xl shadow-sm flex flex-col gap-3">
      
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">
            {item.books.title}
          </h3>
          <p className="text-sm text-muted-foreground">{item.books.author}</p>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
          {renderStatus()}
        </div>
      </div>

      {/* DATES */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={16} /> Pinjam:{" "}
          {new Date(item.created_at).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock size={16} /> Kembali:{" "}
          {item.return_date
            ? new Date(item.return_date).toLocaleDateString()
            : "-"}
        </div>
      </div>

      {/* ACTION */}
      <Button
        variant="outline"
        className="mt-2"
        onClick={() => onDetail(item)}
      >
        Lihat Detail
      </Button>
    </div>
  );
}
