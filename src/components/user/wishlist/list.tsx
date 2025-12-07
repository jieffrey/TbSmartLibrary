"use client";

import WishlistCard from "./card";

interface WishlistListProps {
  items: any[];
  onRemove: (wishlistId: number, bookId: number) => void;
  onBorrow: (book: any) => void;
}

export default function WishlistList({ items, onRemove, onBorrow }: WishlistListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <WishlistCard
          key={item.id}
          item={item}
          onRemove={onRemove}
          onBorrow={onBorrow}
        />
      ))}
    </div>
  );
}
