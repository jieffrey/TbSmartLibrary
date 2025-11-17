"use client";

import { Clock, CalendarDays, AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BorrowedCard({ book }: any) {
  const isLate = new Date(book.dueDate) < new Date();
  const lateDays = isLate
    ? Math.ceil(
        (new Date().getTime() - new Date(book.dueDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const fine = isLate ? lateDays * 1000 : 0; // contoh: Rp 1.000 / hari

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-md border dark:border-zinc-800">
      <div className="flex justify-between items-start">
        {/* Left */}
        <div>
          <h2 className="text-xl font-bold dark:text-white">{book.title}</h2>
          <p className="text-muted-foreground mb-3">{book.author}</p>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-blue-600" />
              <span>
                Tanggal Pinjam:{" "}
                <strong className="dark:text-white">{book.borrowedDate}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} className={isLate ? "text-red-600" : "text-green-600"} />
              <span>
                Tenggat:{" "}
                <strong className={isLate ? "text-red-600" : "dark:text-white"}>
                  {book.dueDate}
                </strong>
              </span>
            </div>

            {isLate && (
              <div className="flex items-center gap-2 text-red-600 font-medium mt-1">
                <AlertTriangle size={16} /> Telat {lateDays} hari — Denda Rp{" "}
                {fine.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCcw size={16} /> Perpanjang
          </Button>

          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Selesaikan
          </Button>
        </div>
      </div>
    </div>
  );
}
