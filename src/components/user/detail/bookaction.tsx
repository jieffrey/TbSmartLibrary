"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, QrCode } from "lucide-react";
import BorrowModal from "./BorrowModal";
import QRModal from "./QRModal";

export default function BookActions(data: any) {
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [qrOpen, setQROpen] = useState(false);

  // simpan data qr
  const [qrData, setQRData] = useState(null);

  function handleBorrowConfirm(info) {
    setQRData({
      title: info.book.title,
      author: info.book.author,
      image: info.book.image,
      return_date: info.returnDate,
      borrowed_at: new Date(),
    });

    setQROpen(true); // langsung buka modal QR
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 mt-6">
        {/* PINJAM */}
        <Button
          onClick={() => setBorrowOpen(true)}
          className="bg-blue-600 text-white rounded-xl h-11"
        >
          <BookOpen className="mr-2" /> Pinjam
        </Button>

        {/* WISHLIST */}
        <Button variant="outline" className="rounded-xl h-11">
          <Bookmark className="mr-2" /> Wishlist
        </Button>

        {/* QR BUTTON */}
        <Button
          variant="outline"
          className="rounded-xl h-11"
          disabled={!qrData}
          onClick={() => setQROpen(true)}
        >
          <QrCode className="mr-2" /> QR
        </Button>
      </div>

      {/* MODAL PINJAM */}
      <BorrowModal
        open={borrowOpen}
        setOpen={setBorrowOpen}
        book={{
          title: data.title,
          author: data.author,
          image: data.image_url,
          category: data.category,
          stock: data.stock,
        }}
        onConfirm={handleBorrowConfirm}
      />

      {/* MODAL QR */}
      <QRModal open={qrOpen} setOpen={setQROpen} qrData={qrData} />
    </>
  );
}
