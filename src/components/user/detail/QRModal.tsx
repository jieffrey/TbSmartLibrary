"use client";
import QRCode from "react-qr-code";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QRModal({
  isOpen,
  onClose,
  type,
  userId,
  bookId,
  batasKembali,
  scanSuccess = false, // <== tambahan
}: {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  userId: string;
  bookId: string;
  batasKembali?: string;
  scanSuccess?: boolean;
}) {
  const router = useRouter();

  if (!isOpen) return null;

  const qrPayload = {
    type,
    user_id: userId,
    book_id: bookId,
    batas_kembali: batasKembali,
    timestamp: Date.now(),
  };

  const qrString = JSON.stringify(qrPayload);

  function handleRedirect() {
    router.push("/user/peminjaman");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {scanSuccess ? "Scan Berhasil!" : "QR Code Peminjaman"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Jika scan sukses → tampilkan pesan + tombol redirect */}
        {scanSuccess ? (
          <>
            <div className="p-4 text-center text-green-600 dark:text-green-300 font-medium">
              Buku berhasil di-scan oleh petugas perpustakaan.
            </div>

            <button
              onClick={handleRedirect}
              className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              Pergi ke Halaman Peminjaman
            </button>
          </>
        ) : (
          <>
            {/* QR Code */}
            <div className="bg-white p-6 rounded-xl flex items-center justify-center">
              <QRCode value={qrString} size={220} level="H" />
            </div>

            {/* Info */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                Tunjukkan QR code ini ke petugas perpustakaan untuk konfirmasi
                peminjaman
              </p>
            </div>

            {/* Batas kembali */}
            {batasKembali && (
              <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                Batas Kembali:{" "}
                {new Date(batasKembali).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              Tutup
            </button>
          </>
        )}
      </div>
    </div>
  );
}
