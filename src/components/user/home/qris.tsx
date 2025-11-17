"use client";
import { QrCode } from "lucide-react";
import { motion } from "framer-motion";

export default function QRPickupCard({ show }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#86A789] dark:bg-[#294B29] p-4 rounded-xl mb-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white text-lg font-semibold">
            QR Pickup Siap Dipindai
          </p>
          <p className="text-white/80 text-sm">
            Tunjukkan QR ini ke petugas untuk ambil buku.
          </p>
        </div>

        <QrCode className="w-12 h-12 text-white" />
      </div>
    </motion.div>
  );
}
