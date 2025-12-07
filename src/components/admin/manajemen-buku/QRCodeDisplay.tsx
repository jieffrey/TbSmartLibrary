"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

type QRCodeDisplayProps = {
  qrCode: string;
  bookTitle: string;
};

export default function QRCodeDisplay({ qrCode, bookTitle }: QRCodeDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  // ✅ Generate QR Code menggunakan API (error correction level H)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&ecc=H&data=${encodeURIComponent(qrCode)}`;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR-${bookTitle.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Gagal mengunduh QR code');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* QR CODE IMAGE */}
      <div className="relative bg-white p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#FFC428] animate-spin" />
          </div>
        )}
        <img
          src={qrCodeUrl}
          alt={`QR Code for ${bookTitle}`}
          className={`w-full h-auto transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            console.error('QR Code failed to load');
            setImageLoaded(true);
          }}
        />
      </div>

      {/* QR CODE TOKEN */}
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">
          Token QR Code:
        </p>
        <p className="font-mono text-xs text-gray-800 dark:text-white break-all bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
          {qrCode}
        </p>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        disabled={downloading || !imageLoaded}
        className="w-full px-4 py-3 rounded-xl bg-[#FFC428] text-black font-semibold
          hover:bg-[#FFD666] hover:shadow-lg transition-all duration-200 
          flex items-center justify-center gap-2
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {downloading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mengunduh...
          </>
        ) : (
          <>
            <Download size={18} />
            Download QR Code
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        📱 Scan QR code ini untuk info buku
      </p>
    </div>
  );
}