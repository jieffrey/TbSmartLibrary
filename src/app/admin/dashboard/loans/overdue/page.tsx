"use client";
import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function OverdueLoans() {
  const [penalties] = useState([
    {
      id: 1,
      user: "Rian Putra",
      book: "Struktur Data",
      dueDate: "2025-10-30",
      returnDate: "2025-11-05",
      fine: 15000,
      status: "Belum Dibayar",
    },
    {
      id: 2,
      user: "Dina Aulia",
      book: "Matematika Diskrit",
      dueDate: "2025-11-10",
      returnDate: "2025-11-09",
      fine: 0,
      status: "Lunas",
    },
  ]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white">
        ⚠️ Daftar Peminjaman Terlambat
      </h2>

      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-gray-600 border-b dark:text-gray-300">
            <th className="py-3">Nama</th>
            <th>Buku</th>
            <th>Jatuh Tempo</th>
            <th>Dikembalikan</th>
            <th>Denda (Rp)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {penalties.map((p) => (
            <tr
              key={p.id}
              className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <td className="py-3">{p.user}</td>
              <td>{p.book}</td>
              <td>{p.dueDate}</td>
              <td>{p.returnDate}</td>
              <td>{p.fine.toLocaleString()}</td>
              <td>
                {p.status === "Lunas" ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle size={16} className="mr-1" /> Lunas
                  </span>
                ) : (
                  <span className="flex items-center text-red-500">
                    <AlertCircle size={16} className="mr-1" /> Belum Dibayar
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
