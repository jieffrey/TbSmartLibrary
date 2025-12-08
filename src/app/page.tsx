'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/user/landingpage/header/navbar";
import { ShineButton } from "@/components/ui/ShineButton";
import { BookCard } from "@/components/user/landingpage/catalog/BookCard";
import CTAButton from "@/components/user/landingpage/catalog/CTAbutton";
import { motion } from "framer-motion";
import FeatureList from "@/components/user/landingpage/fitur/FeatureList";
import StatList from "@/components/user/landingpage/stats/StatList";
import Footer from "@/components/user/landingpage/footer/Footer";
import ContactSection from "@/components/user/landingpage/contact/ContactSection";

type Book = {
  id: string;
  judul: string;
  penulis: string;
  penerbit: string;
  kategori: string;
  stok: number;
  image_url?: string;
  rack?: {
    kode: string;
    deskripsi: string;
  };
};

const Hero: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function fetchFeaturedBooks() {
        try {
          setLoading(true);
          setError(null);
          
          console.log("Fetching books from /api/books...");
          const res = await fetch("/api/books?limit=4");
          console.log("Response status:", res.status);
          
          if (!res.ok) {
            const errorText = await res.text();
            console.error("API Error:", errorText);
            throw new Error(`HTTP ${res.status}: ${errorText}`);
          }
          
          const result = await res.json();
          console.log("API Response:", result);

          // Handle different response formats
          if (result.success && Array.isArray(result.data)) {
            console.log("Books found:", result.data.length);
            setBooks(result.data);
          } else if (Array.isArray(result)) {
            console.log("Books found (direct array):", result.length);
            setBooks(result);
          } else {
            console.warn("Unexpected response format:", result);
            setBooks([]);
          }
        } catch (err: any) {
          console.error("Fetch error:", err);
          // Jangan throw error, cukup set error state
          setError(err.message || "Gagal memuat data buku");
          setBooks([]);
        } finally {
          setLoading(false);
        }
      }

      fetchFeaturedBooks();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <section
  id="home"
  className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden
  bg-[#FFF8E7] dark:bg-[#1A1A1A] transition-colors duration-300"
>
  {/* Navbar */}
  <Navbar />

  {/* Background Image */}
  <div
    className="
      absolute inset-0 bg-cover bg-center 
      opacity-90 dark:opacity-60
      transition-all duration-500
    "
    style={{ backgroundImage: "url('/images/hero/bgHero.png')" }}
  />

  {/* Gradient Overlay */}
  <div className="
    absolute inset-0 
    bg-gradient-to-b
    from-[#FFF8E7]/80 via-[#FFF8E7]/40 to-[#FFF8E7]/10
    dark:from-[#1A1A1A]/80 dark:via-[#1A1A1A]/60 dark:to-[#1A1A1A]/20
    transition-all duration-500
  " />

  {/* Hero Content */}
  <div className="z-10 px-6 sm:px-12">
    <h1
      className="
        text-5xl sm:text-7xl font-extrabold leading-tight 
        text-[#1A1A1A] dark:text-[#FFC428]
      "
    >
      Belajar Tanpa Batas
    </h1>

    <p
      className="
        text-lg sm:text-xl mt-2 mb-8 font-medium
        text-[#1A1A1A]/80 dark:text-[#FFF8E7]/80
      "
    >
      Temukan ilmu, bukan hanya buku.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link href="#catalog">
        <ShineButton
          label="Lihat Katalog"
          size="lg"
          bgColor="linear-gradient(325deg, #FFC428 0%, #FFD56B 60%, #FFC428 100%)"
        />
      </Link>

      <Link href="/full-width-pages/auth/signin">
        <ShineButton
          label="Pinjam Sekarang"
          size="lg"
          bgColor="linear-gradient(325deg, #FFC428 0%, #FFD56B 60%, #FFC428 100%)"
        />
      </Link>
    </div>
  </div>
</section>


<section 
  id="catalog" 
  className="
    py-20 text-center inset-0 
    bg-gradient-to-b 
    from-[var(--color-primary)]/40 via-white/10 to-white/0
    dark:from-[#2a2a2a] dark:via-[#1f1f1f] dark:to-black
  "
>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Koleksi Buku <span className="text-[var(--color-foreground)]">Unggulan</span>
    </h2>

    <p className="text-gray-600 dark:text-gray-400 mb-10">
        Jelajahi ribuan buku digital yang siap kamu pinjam kapan saja.
    </p>

    {/* Loading State */}
    {loading ? (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat koleksi buku...</p>
        </div>
      </div>
    ) : error ? (
      // Error State
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-red-600 dark:text-red-400 mb-2 font-semibold">
          Gagal Memuat Data Buku
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {error}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Muat Ulang
          </button>
          <Link href="/user">
            <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Lihat Semua Buku
            </button>
          </Link>
        </div>
      </div>
    ) : books.length === 0 ? (
      // Empty State
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-gray-600 dark:text-gray-400 mb-2 font-semibold">
          Belum Ada Koleksi Buku
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
          Koleksi buku akan segera ditambahkan
        </p>
        <Link href="/admin/dashboard/books">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Tambah Buku (Admin)
          </button>
        </Link>
      </div>
    ) : (
      // Books Grid
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-16">
          {books.map((book) => {
            console.log("Rendering book:", book.id, book.judul); // ✅ Debug
            return <BookCard key={book.id} book={book} />;
          })}
        </div>

        <div className="mt-12">
          <CTAButton href="/user/home" text="Lihat Semua Buku" variant="primary" />
        </div>
      </>
    )}
</section>

    {/* fitur section */}
    <section className="
      w-full py-20 
      bg-gradient-to-b 
      from-[var(--color-primary)]/60 to-white
      dark:from-[#1A1A1A] dark:to-black 
      text-center
    ">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12 text-[var(--color-dark)] dark:text-white"
      >
        Fitur <span className="text-[var(--color-foreground)]">Unggulan</span>
      </motion.h2>

      <FeatureList />
    </section>


{/* countup section */}
<section className="
  w-full py-24 
  bg-gradient-to-b 
  from-[var(--color-primary)]/50 to-white
  dark:from-[#1A1A1A] dark:to-black
  text-center
">
  <motion.h2
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-3xl font-bold mb-12 text-[var(--color-dark)] dark:text-white"
  >
    Statistik <span className="text-[var(--color-foreground)]">Perpustakaan</span>
  </motion.h2>

  <StatList />
</section>

    {/* ajakan section */}
    <section
  id="tentang"
  className="
    relative w-full py-32 
    bg-gradient-to-br
    from-[var(--color-primary)] via-white to-[var(--color-primary)]
    dark:from-[var(--color-dark)] dark:via-black dark:to-[#0d0d0d]
    text-center 
    text-[var(--color-dark)] dark:text-white 
    overflow-hidden
  "
>
  {/* Background image */}
  <div
    className="
      absolute inset-0 bg-[url('/images/hero/bgHero.png')]
      bg-cover bg-center 
      opacity-15 
      dark:opacity-10
    "
  ></div>

  {/* Soft overlay */}
  <div className="absolute inset-0 bg-white/40 dark:bg-black/40"></div>

  {/* Konten utama */}
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="relative z-10 container mx-auto px-6"
  >
    <h2 className="
      text-4xl md:text-5xl font-bold mb-6 
      drop-shadow-[0_2px_6px_rgba(255,196,40,0.35)]
    ">
      Bergabunglah dengan
      <span className="text-[var(--color-foreground)]"> ribuan pelajar</span>
      <br /> yang telah menemukan dunia ilmu baru!
    </h2>

    <p className="text-lg mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
      Jadilah bagian dari komunitas Smart Eduverse dan rasakan pengalaman belajar tanpa batas.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <CTAButton href="/full-width-pages/auth/signin" text="Masuk Sekarang" variant="primary" />
    </div>
  </motion.div>
</section>

    <section id="contact">
      <ContactSection/>
    </section>
    
    <Footer/>
        </div>
    );
};

export default Hero;