"use client";

import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryCard({ item, onDetail }: any) {
  const isLate = item.status === "late";

  return (
    <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-5 rounded-xl shadow-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{item.book}</h3>
          <p className="text-sm text-muted-foreground">{item.author}</p>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold 
          ${isLate 
            ? "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300"
            : "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {isLate ? "Terlambat" : "Tepat Waktu"}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={16} /> Pinjam: {item.borrowDate}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock size={16} /> Kembali: {item.returnDate}
        </div>
      </div>

      {/* Fine */}
      {item.fine > 0 && (
        <div className="text-red-500 dark:text-red-400 text-sm font-semibold">
          Denda Dibayar: Rp{item.fine.toLocaleString()}
        </div>
      )}

      {/* Action */}
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
