"use client";

import HistoryCard from "./card";

export default function HistoryList({ items, onDetail }: any) {
  return (
    <div className="grid gap-4">
      {items.map((h) => (
        <HistoryCard key={h.id} item={h} onDetail={onDetail} />
      ))}
    </div>
  );
}
