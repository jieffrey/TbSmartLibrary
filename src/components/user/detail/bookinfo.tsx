"use client";
import { Star } from "lucide-react";

export default function BookInfo({ title, author, rating }: any) {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
      <p className="text-muted-foreground text-lg mb-4">{author}</p>

      <div className="flex items-center gap-1 mb-5">
        <Star className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold dark:text-white">{rating}</span>
      </div>
    </div>
  );
}
