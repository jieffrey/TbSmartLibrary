"use client";

import { Button } from "@/components/ui/button";
import { Trash2, BookOpen } from "lucide-react";

export default function WishlistCard({ item, onRemove, onBorrow }: any) {
  // Fallback values untuk safety
  const cover = item?.cover;
  const title = item?.title || "Judul tidak tersedia";
  const author = item?.author || "Penulis tidak diketahui";
  const year = item?.year || "-";
  const kategori = item?.kategori;
  const stok = item?.stok ?? 0;
  
  return (
    <div className="bg-white dark:bg-white/[0.03] border dark:border-zinc-800 p-4 rounded-xl shadow-sm flex gap-4">
      {/* Cover Image */}
      <img
        src={cover}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = "/placeholder-book.jpg";
        }}
        className="w-24 h-32 object-cover rounded-lg border dark:border-zinc-700"
      />

      {/* Book Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {author} • {year}
          </p>
          {kategori && (
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
              {kategori}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            className="bg-blue-600 text-white rounded-lg"
            onClick={() => onBorrow(item)}
          >
            <BookOpen className="mr-2 h-4 w-4" /> Pinjam
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-lg text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => onRemove(item.id, item.book_id)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Hapus
          </Button>
        </div>
      </div>

      {/* Stock Info */}
      <div className="text-right">
        <p className="text-xs text-muted-foreground mb-1">Stok</p>
        <p className={`text-lg font-bold ${stok > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {stok}
        </p>
      </div>
    </div>
  );
}