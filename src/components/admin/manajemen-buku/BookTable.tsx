"use client";

import React, { useState } from "react";
import { Book, deleteBook } from "@/app/api/books/route";
import { Pencil, Trash2, Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type BookTableProps = {
  books: Book[];
};

export default function BookTable({ books }: BookTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number, judul: string) => {
    if (!confirm(`Yakin ingin menghapus buku "${judul}"?`)) return;

    setDeletingId(id);

    try {
      const result = await deleteBook(id);

      if (!result.success) {
        toast({
          title: "Gagal",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: `Buku "${judul}" berhasil dihapus`,
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan tidak terduga",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (books.length === 0) {
    return (
      <div className="
        rounded-2xl border border-gray-200 bg-white 
        dark:border-gray-700 dark:bg-white/[0.03]
        p-12 text-center
      ">
        <div className="text-gray-400 dark:text-gray-600 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Belum ada buku
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tambahkan buku pertama Anda dengan klik tombol "Tambah Buku" di atas
        </p>
      </div>
    );
  }

  return (
    <div className="
      rounded-2xl border border-gray-200 bg-white 
      dark:border-gray-700 dark:bg-white/[0.03]
      overflow-hidden shadow-sm
    ">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          📚 Semua Buku
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({books.length} buku)
          </span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              <th className="p-4 font-semibold">Judul</th>
              <th className="p-4 font-semibold">Penulis</th>
              <th className="p-4 font-semibold">Kategori</th>
              <th className="p-4 font-semibold">Stok</th>
              <th className="p-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className="border-b border-gray-100 dark:border-gray-800 
                  hover:bg-[#FFF8E7] dark:hover:bg-gray-800/40 
                  transition-colors duration-150"
              >
                <td className="p-4">
                  <div className="font-medium text-gray-800 dark:text-white line-clamp-1">
                    {book.judul}
                  </div>
                  {book.penerbit && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {book.penerbit} • {book.tahun_terbit || "-"}
                    </div>
                  )}
                </td>

                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {book.penulis || "-"}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFC428]/10 text-[#FFC428] dark:bg-[#FFC428]/20">
                    {book.kategori || "Lainnya"}
                  </span>
                </td>

                <td className="p-4">
                  <span className={`font-semibold ${
                    book.stok > 5
                      ? "text-green-600 dark:text-green-400"
                      : book.stok > 0
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {book.stok}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* VIEW */}
                    <Link
                      href={`/admin/books/${book.id}`}
                      className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 
                        transition-colors group"
                      title="Lihat Detail"
                    >
                      <Eye className="size-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    </Link>

                    {/* EDIT */}
                    <Link
                      href={`/admin/books/${book.id}/edit`}
                      className="p-2 rounded-lg hover:bg-[#FFC428]/10 dark:hover:bg-[#FFC428]/20 
                        transition-colors group"
                      title="Edit Buku"
                    >
                      <Pencil className="size-5 text-[#FFC428] group-hover:scale-110 transition-transform" />
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(book.id, book.judul)}
                      disabled={deletingId === book.id}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
                        transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Hapus Buku"
                    >
                      {deletingId === book.id ? (
                        <Loader2 className="size-5 text-red-600 dark:text-red-400 animate-spin" />
                      ) : (
                        <Trash2 className="size-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}