"use client";
import Link from "next/link";
import { BookOpen, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        bg-gradient-to-r 
        from-[#FFF8E7] to-[#FFE8B5]
        dark:from-[#1A1A1A] dark:to-[#141414]
        text-[#1A1A1A]
        dark:text-gray-200
        py-10
      "
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-[#FFC428]" />
            <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">
              TB Smart Library
            </h2>
          </div>
          <p className="text-[#1A1A1A]/80 dark:text-gray-300 text-sm leading-relaxed">
            Platform perpustakaan digital modern yang memudahkan kamu
            dalam membaca, meminjam, dan menemukan buku terbaik.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-[#1A1A1A]/80 dark:text-gray-300">
            <li><Link href="/" className="hover:text-[#FFC428]">Beranda</Link></li>
            <li><Link href="/catalog" className="hover:text-[#FFC428]">Katalog Buku</Link></li>
            <li><Link href="/fitur" className="hover:text-[#FFC428]">Fitur</Link></li>
            <li><Link href="/tentang" className="hover:text-[#FFC428]">Tentang Kami</Link></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Bantuan</h3>
          <ul className="space-y-2 text-[#1A1A1A]/80 dark:text-gray-300">
            <li><Link href="/faq" className="hover:text-[#FFC428]">FAQ</Link></li>
            <li><Link href="/kebijakan" className="hover:text-[#FFC428]">Kebijakan Privasi</Link></li>
            <li><Link href="/syarat" className="hover:text-[#FFC428]">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Hubungi Kami</h3>
          <ul className="space-y-3 text-[#1A1A1A]/80 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FFC428]" /> 
              kalsahalkautsar@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFC428]" /> 
              +62 87839615005
            </li>
          </ul>
        </div>
      </div>

      <div className="
        mt-10 border-t 
        border-[#1A1A1A]/20 dark:border-white/10 
        pt-4 text-center 
        text-[#1A1A1A]/70 dark:text-gray-400 text-sm
      ">
        © {new Date().getFullYear()} TB Smart Library. Semua hak dilindungi.
      </div>
    </footer>
  );
}
