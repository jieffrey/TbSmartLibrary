"use client";
import { useState } from "react";
import { BookOpen } from "lucide-react";

export default function ActiveLoans() {
  const [loans] = useState([
    {
      id: 1,
      user: "Rian Putra",
      book: "Struktur Data",
      borrowedDate: "2025-11-01",
      dueDate: "2025-11-15",
      status: "Sedang Dipinjam",
    },
    {
      id: 2,
      user: "Dina Aulia",
      book: "Matematika Diskrit",
      borrowedDate: "2025-11-03",
      dueDate: "2025-11-18",
      status: "Sedang Dipinjam",
    },
  ]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white flex items-center gap-2">
        <BookOpen /> Daftar Peminjaman Aktif
      </h2>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-gray-600 dark:text-gray-300">
            <th className="py-3">Nama Peminjam</th>
            <th>Buku</th>
            <th>Tanggal Pinjam</th>
            <th>Jatuh Tempo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <td className="py-3">{loan.user}</td>
              <td>{loan.book}</td>
              <td>{loan.borrowedDate}</td>
              <td>{loan.dueDate}</td>
              <td>
                <span className="text-blue-600 font-medium">
                  {loan.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
