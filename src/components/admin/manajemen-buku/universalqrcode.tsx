"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { X, Download, Loader2, BookOpen, RefreshCw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type QRModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "borrow" | "return" | "fine"; // ✅ 3 tipe
  userId?: string;
  bookId?: string;
  bookTitle?: string;
  batasKembali?: string;
  fineAmount?: number;
  scanSuccess?: boolean;
  redirectPath?: string;
  qrCode?: string;
};

export default function UniversalQRModal({
  isOpen,
  onClose,
  type,
  userId,
  bookId,
  bookTitle = "",
  batasKembali,
  fineAmount,
  scanSuccess = false,
  redirectPath,
}: QRModalProps) {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // ✅ Generate QR payload based on type
  const qrPayload = {
    type,
    user_id: userId,
    book_id: bookId,
    batas_kembali: batasKembali,
    fine_amount: fineAmount,
    timestamp: Date.now(),
  };

  const qrString = JSON.stringify(qrPayload);

  // ✅ Config berdasarkan type
  const config = {
    borrow: {
      title: scanSuccess ? "Peminjaman Berhasil!" : "QR Code Peminjaman",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      color: "blue",
      successMessage: "Buku berhasil dipinjam oleh petugas perpustakaan.",
      instruction: "Tunjukkan QR code ini ke petugas perpustakaan untuk konfirmasi peminjaman",
    },
    return: {
      title: scanSuccess ? "Pengembalian Berhasil!" : "QR Code Pengembalian",
      icon: <RefreshCw className="w-6 h-6 text-green-600" />,
      color: "green",
      successMessage: "Buku berhasil dikembalikan.",
      instruction: "Tunjukkan QR code ini ke petugas perpustakaan untuk konfirmasi pengembalian",
    },
    fine: {
      title: scanSuccess ? "Pembayaran Denda Berhasil!" : "QR Code Pembayaran Denda",
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      color: "red",
      successMessage: "Denda berhasil dibayar.",
      instruction: "Tunjukkan QR code ini ke petugas perpustakaan untuk pembayaran denda",
    },
  };

  const currentConfig = config[type];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const svg = document.getElementById('universal-qr-code');
      if (!svg) throw new Error('QR Code element not found');

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      canvas.width = 400;
      canvas.height = 400;

      img.onload = () => {
        // White background
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, 400, 400);
        ctx?.drawImage(img, 0, 0, 400, 400);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `QR-${type}-${bookTitle.replace(/\s+/g, '-') || 'code'}.png`;
            link.click();
            URL.revokeObjectURL(url);
          }
          setDownloading(false);
        });
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      console.error('Download failed:', error);
      alert('Gagal mengunduh QR code');
      setDownloading(false);
    }
  };

  const handleRedirect = () => {
    if (redirectPath) {
      router.push(redirectPath);
    } else {
      router.push("/user/peminjaman");
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {currentConfig.icon}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {currentConfig.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {scanSuccess ? (
          // ✅ SUCCESS STATE
          <>
            <div className={`p-4 text-center font-medium rounded-xl mb-4 ${
              type === "borrow"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300"
                : type === "return"
                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300"
                : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300"
            }`}>
              {currentConfig.successMessage}
            </div>

            {/* Book Info */}
            {bookTitle && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Buku:</p>
                <p className="font-semibold text-gray-800 dark:text-white">{bookTitle}</p>
              </div>
            )}

            {/* Fine Amount */}
            {type === "fine" && fineAmount && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Jumlah Denda:</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Rp {fineAmount.toLocaleString("id-ID")}
                </p>
              </div>
            )}

            <button
              onClick={handleRedirect}
              className={`w-full py-3 text-white rounded-xl font-semibold transition-colors ${
                type === "borrow"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : type === "return"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {redirectPath ? "Lanjutkan" : "Lihat Riwayat Peminjaman"}
            </button>
          </>
        ) : (
          // ✅ QR CODE STATE
          <>
            {/* QR Code Display */}
            <div className="bg-white p-6 rounded-xl flex items-center justify-center mb-4 border-2 border-gray-200 dark:border-gray-600">
              <div id="universal-qr-code">
                <QRCode 
                  value={qrString} 
                  size={220} 
                  level="H"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
            </div>

            {/* Book Title */}
            {bookTitle && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buku:</p>
                <p className="font-semibold text-gray-800 dark:text-white">{bookTitle}</p>
              </div>
            )}

            {/* Fine Amount Display */}
            {type === "fine" && fineAmount && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Jumlah Denda:</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Rp {fineAmount.toLocaleString("id-ID")}
                </p>
              </div>
            )}

            {/* Instruction */}
            <div className={`p-4 rounded-lg mb-4 ${
              type === "borrow"
                ? "bg-blue-50 dark:bg-blue-900/20"
                : type === "return"
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-red-50 dark:bg-red-900/20"
            }`}>
              <p className={`text-sm text-center ${
                type === "borrow"
                  ? "text-blue-800 dark:text-blue-200"
                  : type === "return"
                  ? "text-green-800 dark:text-green-200"
                  : "text-red-800 dark:text-red-200"
              }`}>
                {currentConfig.instruction}
              </p>
            </div>

            {/* Batas Kembali (untuk borrow) */}
            {type === "borrow" && batasKembali && (
              <div className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Batas Kembali: </span>
                {new Date(batasKembali).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}

            {/* QR Token */}
            <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                Token QR Code:
              </p>
              <p className="font-mono text-xs text-gray-800 dark:text-white break-all bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
                {qrString}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  type === "borrow"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : type === "return"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Download
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl font-semibold transition-colors"
              >
                Tutup
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}