"use client";
import { Book, Users, HandHeart, Library } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeatureList() {
  const stats = [
    {
      icon: <Book className="w-10 h-10 text-[var(--color-foreground)]" />,
      value: "12.500+",
      label: "Koleksi Buku",
      delay: 0.2,
    },
    {
      icon: <Users className="w-10 h-10 text-[var(--color-foreground)]" />,
      value: "8.200+",
      label: "Pengguna Aktif",
      delay: 0.4,
    },
    {
      icon: <HandHeart className="w-10 h-10 text-[var(--color-foreground)]" />,
      value: "5.700+",
      label: "Peminjaman Selesai",
      delay: 0.6,
    },
    {
      icon: <Library className="w-10 h-10 text-[var(--color-foreground)]" />,
      value: "120+",
      label: "Kategori Buku",
      delay: 0.8,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
      {stats.map((item, i) => (
        <FeatureCard key={i} {...item} />
      ))}
    </div>
  );
}
