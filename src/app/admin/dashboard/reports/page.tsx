"use client";

import React from "react";
import TopBooksChart from "@/components/admin/laporan/TopBookChart";
import TopUsersChart from "@/components/admin/laporan/TopUsersChart";
import MonthlyLoansChart from "@/components/admin/laporan/MonthlyLoansChart";
import ExportButtons from "@/components/admin/laporan/ExportButtons";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  // --- Dummy data (ganti dgn API call nanti) ---
  const topBooks = [
    { title: "Belajar React untuk Pemula", count: 128 },
    { title: "JavaScript Advanced", count: 89 },
    { title: "Next.js Mastery", count: 76 },
    { title: "Algoritma & Struktur Data", count: 68 },
    { title: "Design Patterns", count: 55 },
  ];

  const topUsers = [
    { name: "Kalsah Alkautsar", loans: 42 },
    { name: "Siti Aisyah", loans: 34 },
    { name: "Budi Santoso", loans: 28 },
    { name: "Rina Marlina", loans: 22 },
    { name: "Joko Widodo", loans: 18 },
  ];

  const monthly = [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 98 },
    { month: "Mar", count: 140 },
    { month: "Apr", count: 112 },
    { month: "May", count: 152 },
    { month: "Jun", count: 130 },
    { month: "Jul", count: 170 },
    { month: "Aug", count: 160 },
    { month: "Sep", count: 140 },
    { month: "Oct", count: 185 },
    { month: "Nov", count: 210 },
    { month: "Dec", count: 220 },
  ];

  // payload gabungan untuk export sederhana
  const exportPayload = monthly.map((m) => ({ Month: m.month, Peminjaman: m.count }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laporan & Statistik</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ringkasan aktivitas peminjaman dan pengguna.</p>
        </div>

        <div className="flex items-center gap-3">
          <ExportButtons reportName="laporan-peminjaman" payload={exportPayload} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyLoansChart data={monthly} />
        </div>

        <div className="space-y-6">
          <TopBooksChart data={topBooks} />
          <TopUsersChart data={topUsers} />
        </div>
      </div>

      {/* Small summary cards (optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">Total Peminjaman</p>
            <h3 className="text-xl font-semibold">1,524</h3>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">Buku Terpopuler</p>
            <h3 className="text-xl font-semibold">Belajar React untuk Pemula</h3>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">User Aktif Bulan Ini</p>
            <h3 className="text-xl font-semibold">312</h3>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">Peminjaman Lewat Jatuh Tempo</p>
            <h3 className="text-xl font-semibold text-red-600">58</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
