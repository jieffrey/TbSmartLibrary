"use client";

import { useState } from "react";
import { Search, Bell, User, QrCode } from "lucide-react";
import { motion } from "framer-motion";
import CategoryList from "@/components/user/home/kategori";
import QRPickupCard from "@/components/user/home/qris";
import PopularBooks from "@/components/user/home/popularbook";
import BookCatalog from "@/components/user/home/katalog";

export default function UserHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 dark:bg-[#1A1A1A]">

      {/* HEADER */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#294B29] dark:text-[#D2E3C8]">
          TB Smart Library
        </h1>

        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-[#294B29] dark:text-white" />
          <User className="w-7 h-7 text-[#294B29] dark:text-white cursor-pointer" />
        </div>
      </header>

      {/* SEARCH */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Cari buku..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-[#121212] dark:text-white"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* GREETING */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#D2E3C8] dark:bg-[#294B29] p-5 rounded-2xl mb-6"
      >
        <h2 className="text-xl font-semibold text-[#294B29] dark:text-white">
          Selamat datang kembali 👋
        </h2>
        <p className="text-gray-700 dark:text-gray-200">
          Mau baca buku apa hari ini?
        </p>
      </motion.div>

      {/* QR PICKUP (only when user has pending pickup) */}
      <QRPickupCard show={true} />

      {/* CATEGORY LIST */}
      <CategoryList />

      {/* POPULAR BOOKS */}
      <PopularBooks />
      {/* FULL CATALOG */}
      <BookCatalog searchQuery={searchQuery} />
    </div>
  );
}
