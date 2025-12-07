"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BorrowModal({ open, setOpen, book, onConfirm }: any) {
  const today = new Date();
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  function handleConfirm() {
    if (!returnDate) {
      alert("Pilih tanggal pengembalian");
      return;
    }

    // Validasi: return date harus setelah hari ini
    if (returnDate <= today) {
      alert("Tanggal pengembalian harus setelah hari ini");
      return;
    }

    onConfirm({
      book,
      returnDate: returnDate, // ← Kirim Date object, bukan string
    });

    setOpen(false);
    setReturnDate(undefined); // Reset date
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle>Konfirmasi Peminjaman Buku</DialogTitle>
        </DialogHeader>

        {/* Detail buku */}
        <div className="flex items-center gap-4 mt-3">
          <img
            src={book.image}
            alt={book.title}
            className="w-16 h-20 object-cover rounded-lg border"
          />
          <div>
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {/* Tanggal Pinjam */}
          <div className="p-4 border rounded-lg dark:border-zinc-700">
            <p className="text-sm text-muted-foreground">Tanggal Pinjam</p>
            <p className="font-semibold">
              {today.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Calendar */}
          <div>
            <p className="text-sm mb-2 text-muted-foreground">
              Pilih Tanggal Pengembalian
            </p>
            <Calendar
              mode="single"
              selected={returnDate}
              onSelect={setReturnDate}
              disabled={(date) => date <= today} // ← Disable tanggal sebelum/sama dengan hari ini
              className="rounded-lg border dark:border-zinc-700"
            />
          </div>

          {/* Tanggal terpilih */}
          {returnDate && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Tanggal Kembali: {returnDate.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          )}

          <Button
            className="w-full bg-blue-600 text-white rounded-xl h-11 hover:bg-blue-700"
            disabled={!returnDate}
            onClick={handleConfirm}
          >
            Konfirmasi Pinjam
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}