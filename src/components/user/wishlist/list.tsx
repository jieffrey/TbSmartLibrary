"use client";

import WishlistCard from "./card";

export default function WishlistList({ items, onRemove, onBorrow }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((book: any) => (
        <WishlistCard
          key={book.id}
          book={book}
          onRemove={onRemove}
          onBorrow={onBorrow}
        />
      ))}
    </div>
  );
}
