"use client";
import { MessageSquare } from "lucide-react";

export default function BookReviews() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
        <MessageSquare className="w-5 h-5" />
        Ulasan Pembaca
      </h2>

      <div className="p-4 bg-muted dark:bg-zinc-800 rounded-lg mt-4">
        <p className="text-muted-foreground">Belum ada ulasan.</p>
      </div>
    </div>
  );
}
