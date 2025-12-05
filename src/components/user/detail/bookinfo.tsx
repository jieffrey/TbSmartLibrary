"use client";

import { Star } from "lucide-react";

export default function BookInfo({ title, author, rating }: any) {
  return (
    <div className="flex-1 space-y-3">
      <h1 className="text-3xl font-bold tracking-tight dark:text-white leading-tight">
        {title}
      </h1>

      <p className="text-muted-foreground text-lg">{author}</p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  );
}
