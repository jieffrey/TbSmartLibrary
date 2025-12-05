
import { getAllBooks } from "@/app/api/books/route";
import { Plus } from "lucide-react";
import Link from "next/link";
import BookTable from "@/components/admin/manajemen-buku/BookTable";

export default async function BooksPage() {
  const result = await getAllBooks();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Kelola Buku
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tambah, edit, dan hapus buku perpustakaan
          </p>
        </div>

        {/* BUTTON TAMBAH */}
        <Link
          href="/admin/books/add"
          className="px-6 py-3 rounded-xl bg-[#FFC428] text-black font-semibold
            hover:bg-[#FFD666] hover:shadow-lg hover:scale-[1.02]
            transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={20} />
          Tambah Buku
        </Link>
      </div>

      {/* ERROR STATE */}
      {!result.success && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 mb-6">
          <p className="text-red-700 dark:text-red-400 font-medium">
            ⚠️ {result.error}
          </p>
        </div>
      )}

      {/* TABLE */}
      {result.success && <BookTable books={result.data || []} />}
    </div>
  );
}