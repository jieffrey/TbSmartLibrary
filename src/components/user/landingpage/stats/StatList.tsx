"use client";
import { Book, Users, HandHeart, Library } from "lucide-react";
import StatCard from "./StatCard";

export default function StatList() {
  const stats = [
    {
      icon: <Book className="w-10 h-10 text-sky-500" />,
      value: "12.500+",
      label: "Koleksi Buku",
      delay: 0.2,
    },
    {
      icon: <Users className="w-10 h-10 text-indigo-500" />,
      value: "8.200+",
      label: "Pengguna Aktif",
      delay: 0.4,
    },
    {
      icon: <HandHeart className="w-10 h-10 text-emerald-500" />,
      value: "5.700+",
      label: "Peminjaman Selesai",
      delay: 0.6,
    },
    {
      icon: <Library className="w-10 h-10 text-orange-400" />,
      value: "120+",
      label: "Kategori Buku",
      delay: 0.8,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
      {stats.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
}
