import { 
  ArrowLeft, Pencil, Trash2, Calendar, User, Building, Tag, 
  Package, MapPin, QrCode 
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteBookButton from "@/components/admin/manajemen-buku/DeleteBookButton";
import QRCodeDisplay from "@/components/admin/manajemen-buku/QRCodeDisplay";
import BookCover from "@/components/admin/manajemen-buku/BookCover";

type BookDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage(props: BookDetailPageProps) {
  const params = await props.params;

  // Absolute URL untuk server-side fetch
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/books/${params.id}`, {
    cache: "no-store",
  });

  if (!response.ok) notFound();

  const book = await response.json();
  console.log("==========", book)

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
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
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            📖 Detail Buku
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Informasi lengkap tentang buku ini
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <Link
            href={`/admin/dashboard/books/${book.id}/edit`}
            className="px-4 py-2.5 rounded-xl bg-[#FFC428] text-black font-semibold
              hover:bg-[#FFD666] hover:shadow-lg hover:scale-[1.02]
              transition-all duration-200 flex items-center gap-2"
          >
            <Pencil size={18} />
            Edit
          </Link>

          <DeleteBookButton bookId={book.id} bookTitle={book.judul} />
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — COVER & QR */}
        <div className="space-y-6">
          {/* BOOK COVER */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Cover Buku
            </h3>
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
              <BookCover imageUrl={book.image_url} title={book.judul} />
            </div>
          </div>

          {/* QR CODE */}
          {book.qr_code && (
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <QrCode size={20} />
                QR Code
              </h3>
              <QRCodeDisplay qrCode={book.qr_code} bookTitle={book.judul} />
            </div>
          )}
        </div>

        {/* RIGHT — DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          {/* MAIN INFO */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {book.judul}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Penulis */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Penulis</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {book.penulis || "-"}
                  </p>
                </div>
              </div>

              {/* Penerbit */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <Building className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Penerbit</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {book.penerbit || "-"}
                  </p>
                </div>
              </div>

              {/* Tahun Terbit */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tahun Terbit</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {book.tahun_terbit || "-"}
                  </p>
                </div>
              </div>

              {/* Kategori */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FFC428]/20">
                  <Tag className="w-5 h-5 text-[#FFC428]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kategori</p>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[#FFC428]/20 text-[#FFC428]">
                    {book.kategori || "Lainnya"}
                  </span>
                </div>
              </div>

              {/* Stok */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <Package className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Stok Tersedia</p>
                  <p className={`text-2xl font-bold ${
                    book.stok > 5
                      ? "text-green-600 dark:text-green-400"
                      : book.stok > 0
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {book.stok}
                  </p>
                </div>
              </div>

              {/* Lokasi Rak */}
              {book.shelf_location && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-900/20">
                    <MapPin className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lokasi Rak</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {book.shelf_location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              📝 Metadata
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">ID Buku</span>
                <span className="font-mono text-sm font-semibold text-gray-800 dark:text-white">
                  #{book.id}
                </span>
              </div>

              {book.created_at && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ditambahkan</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {new Date(book.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}

              {book.updated_at && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Terakhir Diupdate</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {new Date(book.updated_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* STOCK STATUS */}
          <div className={`rounded-2xl border p-6 ${
            book.stok > 5
              ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
              : book.stok > 0
              ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
              : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
          }`}>
            <div className="flex items-center gap-3">
              <Package className={`w-6 h-6 ${
                book.stok > 5
                  ? "text-green-600 dark:text-green-400"
                  : book.stok > 0
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              }`} />
              <div>
                <h3 className={`font-bold ${
                  book.stok > 5
                    ? "text-green-800 dark:text-green-300"
                    : book.stok > 0
                    ? "text-yellow-800 dark:text-yellow-300"
                    : "text-red-800 dark:text-red-300"
                }`}>
                  {book.stok > 5
                    ? "Stok Tersedia"
                    : book.stok > 0
                    ? "Stok Terbatas"
                    : "Stok Habis"}
                </h3>
                <p className={`text-sm ${
                  book.stok > 5
                    ? "text-green-600 dark:text-green-400"
                    : book.stok > 0
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {book.stok > 5
                    ? "Buku tersedia untuk dipinjam"
                    : book.stok > 0
                    ? "Segera tambahkan stok buku ini"
                    : "Buku tidak tersedia untuk dipinjam"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
