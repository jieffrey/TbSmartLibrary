"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, QrCode } from "lucide-react";

export default function BookActions() {
  return (
    <div className="flex flex-col md:flex-row gap-3 mt-4">
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <BookOpen className="mr-2 h-4 w-4" /> Pinjam Buku
      </Button>

      <Button variant="outline">
        <Bookmark className="mr-2 h-4 w-4" /> Simpan ke Wishlist
      </Button>

      <Button variant="outline">
        <QrCode className="mr-2 h-4 w-4" /> QR Penukaran
      </Button>
    </div>
  );
}
