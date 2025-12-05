// BorrowModal.jsx
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

export default function BorrowModal({ open, setOpen, book, onConfirm }): any {
  const today = new Date();
  const [returnDate, setReturnDate] = useState();

  function handleConfirm() {
    onConfirm({
      book,
      returnDate,
    });

    setOpen(false);
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
            className="w-16 h-20 object-cover rounded-lg border"
          />
          <div>
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="p-4 border rounded-lg dark:border-zinc-700">
            <p className="text-sm text-muted-foreground">Tanggal Pinjam</p>
            <p className="font-semibold">{today.toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-sm mb-2 text-muted-foreground">
              Pilih Tanggal Pengembalian
            </p>
            <Calendar
              mode="single"
              selected={returnDate}
              onSelect={setReturnDate}
              className="rounded-lg border dark:border-zinc-700"
            />
          </div>

          <Button
            className="w-full bg-blue-600 text-white rounded-xl h-11"
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
