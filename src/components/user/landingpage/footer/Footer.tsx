"use client";
import Link from "next/link";
import { BookOpen, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-400 to-sky-600 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo dan Deskripsi */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-2xl font-bold">SmartLibrary</h2>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            Platform perpustakaan digital modern yang memudahkan kamu
            dalam membaca, meminjam, dan menemukan buku terbaik.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-white/90">
            <li><Link href="/" className="hover:text-white">Beranda</Link></li>
            <li><Link href="/catalog" className="hover:text-white">Katalog Buku</Link></li>
            <li><Link href="/fitur" className="hover:text-white">Fitur</Link></li>
            <li><Link href="/tentang" className="hover:text-white">Tentang Kami</Link></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Bantuan</h3>
          <ul className="space-y-2 text-white/90">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/kebijakan" className="hover:text-white">Kebijakan Privasi</Link></li>
            <li><Link href="/syarat" className="hover:text-white">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Hubungi Kami</h3>
          <ul className="space-y-3 text-white/90">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> kalsahalkautsar@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +62 87839615005
            </li>
          </ul>
        </div>
      </div>

      {/* Garis Bawah */}
      <div className="mt-10 border-t border-white/30 pt-4 text-center text-white/80 text-sm">
        © {new Date().getFullYear()} SmartLibrary. Semua hak dilindungi.
      </div>
    </footer>
  );
}
