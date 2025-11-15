"use client";
import { Bell, Brain, Scan } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeatureList() {
  const features = [
    {
      icon: <Bell className="w-10 h-10 text-blue-500" />,
      title: "Notifikasi Otomatis",
      desc: "Dapatkan pengingat sebelum masa peminjaman buku habis secara otomatis.",
      delay: 0.2,
    },
    {
      icon: <Brain className="w-10 h-10 text-indigo-500" />,
      title: "Rekomendasi AI",
      desc: "AI merekomendasikan buku sesuai minat dan riwayat bacaanmu.",
      delay: 0.4,
    },
    {
      icon: <Scan className="w-10 h-10 text-emerald-500" />,
      title: "Scan Buku Cepat",
      desc: "Pindai kode QR buku untuk lihat detail dan status pinjam seketika.",
      delay: 0.6,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 md:px-16">
      {features.map((feature, i) => (
        <FeatureCard key={i} {...feature} />
      ))}
    </div>
  );
}
