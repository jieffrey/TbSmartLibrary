"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MapPin, User, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

type BookCardProps = {
  book?: {
    id: string | number;
    judul: string;
    penulis: string;
    penerbit?: string;
    kategori: string;
    stok: number;
    image_url?: string;
    rack?: {
      kode: string;
      deskripsi: string;
    };
  };
};

export function BookCard({ book }: BookCardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ FIX: Early return dengan null check
  if (!book) {
    console.error("BookCard: No book data provided");
    return null;
  }

  const handlePinjam = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    router.push(`/user/book/${book.id}`);
  };

  const handleLoginRedirect = () => {
    sessionStorage.setItem('redirectAfterLogin', `/user/book/${book.id}`);
    router.push("/full-width-pages/auth/signin");
  };

  const isAvailable = book.stok > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.03, y: -3 }}
        className="bg-white dark:bg-[#181818] rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-neutral-800 overflow-hidden cursor-pointer h-full flex flex-col"
      >
        {/* Image Section */}
        <div className="w-full h-44 sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
          <img
            src={book.image_url || "/placeholder.png"}
            alt={book.judul || "Book cover"}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/200x300?text=No+Image";
            }}
          />
          
          {/* Stock Badge */}
          <div className="absolute top-2 right-2">
            {isAvailable ? (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full shadow-md">
                Tersedia ({book.stok})
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full shadow-md">
                Habis
              </span>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full shadow-md">
              {book.kategori || "Uncategorized"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-semibold text-black dark:text-white text-sm line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
            {book.judul}
          </h3>

          {/* Author */}
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mb-1">
            <User size={12} className="flex-shrink-0" />
            <p className="line-clamp-1">{book.penulis}</p>
          </div>

          {/* Location/Rack */}
          {book.rack ? (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500 mb-3">
              <MapPin size={12} className="flex-shrink-0" />
              <p className="line-clamp-1">
                {book.rack.kode} - {book.rack.deskripsi}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-600 mb-3">
              <MapPin size={12} className="flex-shrink-0" />
              <p>Lokasi belum ditentukan</p>
            </div>
          )}

          {/* Borrow Button */}
          <button
            onClick={handlePinjam}
            disabled={!isAvailable}
            className={`mt-auto w-full py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isAvailable
                ? "bg-[#FFC428] text-black hover:bg-black hover:text-[#FFC428] dark:bg-[#FFC248] dark:text-black dark:hover:bg-transparent dark:hover:border dark:border-[#FFC248] dark:hover:text-[#FFC248]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            }`}
          >
            {isAvailable ? (
              <span className="flex items-center justify-center gap-1">
                <BookOpen size={16} />
                {isAuthenticated ? "Pinjam" : "Login untuk Pinjam"}
              </span>
            ) : (
              "Tidak Tersedia"
            )}
          </button>
        </div>
      </motion.div>

      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#FFC428]/20"
            >
              <div className="w-16 h-16 bg-[#FFF8E7] dark:bg-[#FFC428]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-[#FFC428]" />
              </div>

              <h3 className="text-2xl font-bold text-center text-[#1A1A1A] dark:text-white mb-2">
                Login Diperlukan
              </h3>

              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Silakan login terlebih dahulu untuk meminjam buku{" "}
                <span className="font-semibold text-[#FFC428]">"{book.judul}"</span>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleLoginRedirect}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#FFC428] text-black font-semibold hover:bg-black hover:text-[#FFC428] transition-all"
                >
                  Login Sekarang
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BookCard;