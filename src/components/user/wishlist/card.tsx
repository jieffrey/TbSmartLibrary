"use client";

import { Heart, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WishlistCard({ book, onRemove, onBorrow }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl p-4 shadow-sm flex gap-4">
      
      {/* Cover */}
      <div className="w-20 h-28 relative rounded-md overflow-hidden shadow">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="text-lg font-bold dark:text-white">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <p className="mt-1 text-xs text-muted-foreground">{book.year}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => onBorrow(book)}
          >
            <BookOpen size={16} /> Pinjam Sekarang
          </Button>

          <button
            onClick={() => onRemove(book.id)}
            className="text-red-600 hover:text-red-700 p-2"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
