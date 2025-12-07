'use client'

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

interface BookCardProps {
  id: number
  judul: string
  penulis?: string
  kategori?: string
  stok?: number
  image_url?: string
  rack?: {
    kode?: string
    deskripsi?: string
  }
}

export default function BookCard({ id, judul, penulis, kategori, stok, image_url }: any) {
  return (
    <Link href={`/user/book/${id}`} className="block">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition">
          <img
            src={image_url}
            alt={judul}
            className="w-full h-40 object-cover"
          />

          <CardContent className="p-4">
            <h3 className="font-semibold text-black dark:text-white mb-1">
              {judul}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {penulis}
            </p>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{kategori}</span> • <span>Stok: {stok}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
