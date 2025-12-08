"use client";

import { useState } from "react";
import UniversalQRModal from "@/components/shared/UniversalQRModal";

type QRCodeSectionProps = {
  qrCode: string;
  bookId: string;
  bookTitle: string;
};

export default function QRCodeSection({ qrCode, bookId, bookTitle }: QRCodeSectionProps) {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {/* Preview Button */}
      <button
        onClick={() => setShowQR(true)}
        className="w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Lihat & Download QR Code
      </button>

      {/* QR Code Display */}
      <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">
          Token QR Code:
        </p>
        <p className="font-mono text-xs text-gray-800 dark:text-white break-all bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
          {qrCode}
        </p>
      </div>

      {/* Universal QR Modal */}
      <UniversalQRModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        type="borrow"
        bookId={bookId}
        bookTitle={bookTitle}
        qrCode={qrCode}
      />
    </>
  );
}