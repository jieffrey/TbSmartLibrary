import BookForm from "@/components/admin/manajemen-buku/BookForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddBookPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* BREADCRUMB */}
      <Link
        href="/admin/dashboard/books"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
          hover:text-[#FFC428] transition-colors mb-6 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Daftar Buku
      </Link>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          ➕ Tambah Buku Baru
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Isi formulir di bawah untuk menambahkan buku ke perpustakaan
        </p>
      </div>

      {/* FORM */}
      <BookForm mode="add" />
    </div>
  );
}