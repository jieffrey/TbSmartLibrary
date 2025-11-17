"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export default function QRISModal({ open, onClose, amount }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">Bayar Denda</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Total: Rp {amount.toLocaleString()}</p>

          {/* QR Placeholder */}
          <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300">QR Code</span>
          </div>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Scan QRIS menggunakan aplikasi pembayaran Anda.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
