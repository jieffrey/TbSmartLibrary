"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";

export default function QRModal({ open, setOpen, qrData }) {
  if (!qrData) return null;

  
  const payload = JSON.stringify(qrData);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm p-6 rounded-xl text-center space-y-4">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Kode QR Peminjaman
          </DialogTitle>
        </DialogHeader>

        <QRCodeCanvas
          value={payload}
          size={200}
          className="mx-auto bg-white p-3 rounded-lg border"
        />

        <p className="text-sm text-muted-foreground">
          Tunjukkan QR ini ke petugas perpustakaan.
        </p>
      </DialogContent>
    </Dialog>
  );
}
