"use client";
import React from "react";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function BookTable() {
  const books = [
    {
      id: 1,
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      kategori: "Novel",
      status: "Tersedia",
      stok: 12,
    },
    {
      id: 2,
      judul: "Negeri 5 Menara",
      penulis: "A. Fuadi",
      kategori: "Novel",
      status: "Dipinjam",
      stok: 0,
    },
  ];

  return (
    <div className="
      rounded-2xl border border-gray-200 bg-white 
      dark:border-gray-700 dark:bg-gray-900/40
      p-6 mt-6
    ">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Semua Buku
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              <th className="p-3">Judul</th>
              <th className="p-3">Penulis</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Status</th>
              <th className="p-3">Stok</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr 
                key={book.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
              >
                <td className="p-3 text-gray-800 dark:text-white">{book.judul}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{book.penulis}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{book.kategori}</td>
                
                <td className="p-3">
                  <span
                    className={`
                      px-2 py-1 rounded-md text-xs font-medium
                      ${book.status === "Tersedia" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : book.status === "Dipinjam" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}
                    `}
                  >
                    {book.status}
                  </span>
                </td>

                <td className="p-3 text-gray-800 dark:text-white">{book.stok}</td>

                <td className="p-3 text-center flex items-center justify-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <Eye className="size-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <Pencil className="size-5 text-yellow-600 dark:text-yellow-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <Trash2 className="size-5 text-red-600 dark:text-red-400" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
