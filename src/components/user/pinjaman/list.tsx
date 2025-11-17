"use client";
import BorrowedCard from "./card";

export default function BorrowedList({ items }: any) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((book: any, i: number) => (
        <BorrowedCard key={i} book={book} />
      ))}
    </div>
  );
}
