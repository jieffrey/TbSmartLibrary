'use client'
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/user/landingpage/header/navbar";
import { ShineButton } from "@/components/ui/ShineButton";
import BookCard from "@/components/user/landingpage/catalog/BookCard";
import CTAButton from "@/components/user/landingpage/catalog/CTAbutton";
import { motion } from "framer-motion";
import FeatureList from "@/components/user/landingpage/fitur/FeatureList";
import StatList from "@/components/user/landingpage/stats/StatList";
import Footer from "@/components/user/landingpage/footer/Footer";
import ContactSection from "@/components/user/landingpage/contact/ContactSection";

const Hero: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const books = [
        { id: 1, title: "Pemrograman Dasar", category: "Teknologi", rating: 4.8, img: "/images/books/book1.jpg" },
        { id: 2, title: "Psikologi Pendidikan", category: "Pendidikan", rating: 4.6, img: "/images/books/book2.jpg" },
        { id: 3, title: "Sejarah Dunia", category: "Sejarah", rating: 4.7, img: "/images/books/book3.jpg" },
        { id: 4, title: "Kewirausahaan Modern", category: "Bisnis", rating: 4.9, img: "/images/books/book4.jpg" },
    ]
    return (
        <div className="overflow-x-hidden">
            <section
    id="home"
    className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden
    bg-white dark:bg-gray-950 transition-colors duration-300"
>
    {/* Navbar */}
    <Navbar />

    {/* ====== Background Image ====== */}
    <div
        className="
            absolute inset-0 bg-cover bg-center 
            brightness-100 dark:brightness-[0.45] 
            transition-all duration-500
        "
        style={{ backgroundImage: "url('/images/hero/bgHero.png')" }}
    />

    {/* ====== Light & Dark Gradient Overlay ====== */}
    <div className="
        absolute inset-0 
        bg-gradient-to-b
        from-sky-400/60 via-sky-300/40 to-white/10
        dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-950/30
        transition-all duration-500
    " />

    {/* ====== Hero Content ====== */}
    <div className="z-10 px-6 sm:px-12">
        <h1 className="
            text-5xl sm:text-7xl font-bold leading-tight drop-shadow-lg
            text-white dark:text-white
        ">
            Belajar Tanpa Batas
        </h1>

        <p className="
            text-xl font-medium mb-8 drop-shadow-md
            text-white dark:text-gray-300
        ">
            Temukan ilmu, bukan hanya buku.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Tombol 1 */}
            <Link href="#catalog">
                <ShineButton
                    label="Lihat Katalog"
                    size="lg"
                    bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                    onClick={() => console.log("Lihat Katalog clicked!")}
                />
            </Link>

            {/* Tombol 2 */}
            <Link href="full-width-pages/auth/signup">
                <ShineButton
                    label="Pinjam Sekarang"
                    size="lg"
                    bgColor="linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)"
                    onClick={() => console.log("Pinjam Sekarang clicked!")}
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
    from-sky-400/60 via-sky-300/40 to-white/10
    dark:from-[#4298b0]/60 dark:via-[#2e4e5a]/40 dark:to-black/40
  "
>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Koleksi Buku <span className="text-[var(--color-primary)]">Unggulan</span>
    </h2>

    <p className="text-gray-600 dark:text-gray-400 mb-10">
        Jelajahi ribuan buku digital yang siap kamu pinjam kapan saja.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {books.map((book) => (
            <BookCard key={book.id} {...book} />
        ))}
    </div>

    <div className="mt-12">
        <CTAButton href="/catalog" text="Lihat Semua Buku" variant="primary" />
    </div>
</section>

{/* fitur section */}
            <section className="w-full py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-black text-center">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12"
      >
        Fitur <span className="text-sky-600 dark:text-sky-400">Unggulan</span>
      </motion.h2>

      <FeatureList />
    </section>

{/* countup section */}
    <section className="w-full py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12"
      >
        Statistik <span className="text-sky-600 dark:text-sky-400">Perpustakaan</span>
      </motion.h2>

      <StatList />
    </section>

    {/* ajakan section */}
    <section
  id="tentang"
  className="
    relative w-full py-32 
    bg-gradient-to-br 
    from-sky-500 via-sky-400 to-blue-600
    dark:from-[#0b2239] dark:via-[#0a1a2b] dark:to-black
    text-center text-white overflow-hidden
  "
>
  {/* Background image */}
  <div
    className="
      absolute inset-0 bg-[url('/images/hero/bgHero.png')] 
      bg-cover bg-center 
      opacity-20 
      dark:opacity-10
    "
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

  {/* Konten utama */}
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="relative z-10 container mx-auto px-6"
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
      Bergabunglah dengan
      <span className="text-yellow-300 dark:text-yellow-400"> ribuan pelajar</span>
      <br /> yang telah menemukan dunia ilmu baru!
    </h2>

    <p className="text-lg mb-10 text-white/90 dark:text-gray-300 max-w-2xl mx-auto">
      Jadilah bagian dari komunitas Smart Eduverse dan rasakan pengalaman belajar tanpa batas.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <CTAButton href="/signup" text="Masuk Sekarang" variant="primary" />
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
