import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BookTable from "@/components/admin/manajemen-buku/BookTable";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Buku | PusTBaka Admin",
  description: "Kelola koleksi buku perpustakaan",
};

export default async function BooksPage() {
  const supabase = await createServerSupabaseClient();

  // Check auth
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/full-width-pages/auth/signin");
  }

  // Check admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/user");
  }

  // ✅ Fetch books directly (bukan import function dari route)
  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch books error:", error);
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800">Error loading books: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            📚 Manajemen Buku
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola koleksi buku perpustakaan
          </p>
        </div>

        <Link
          href="/admin/dashboard/books/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl 
            bg-[#FFC428] text-black font-semibold
            hover:bg-[#FFD666] hover:shadow-lg hover:scale-[1.02]
            transition-all duration-200"
        >
          <Plus size={20} />
          Tambah Buku
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Buku</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {books?.length || 0}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl shadow-sm border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-300">Stok Tersedia</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {books?.filter((b) => b.stok > 0).length || 0}
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl shadow-sm border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-300">Stok Habis</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {books?.filter((b) => b.stok === 0).length || 0}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">Kategori</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {new Set(books?.map((b) => b.kategori)).size || 0}
          </p>
        </div>
      </div>

      {/* Table */}
      <BookTable books={books || []} />
    </div>
  );
}