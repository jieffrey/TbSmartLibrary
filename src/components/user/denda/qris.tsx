"use client";

import QRCode from "react-qr-code";

export default function QRModal({ isOpen, onClose, dendaId, amount }) {
  if (!isOpen) return null;

  const payload = { denda_id: dendaId, amount, timestamp: Date.now() };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
        <QRCode value={JSON.stringify(payload)} size={180} />
        <p className="mt-2 text-center">
          Scan QR ini oleh admin untuk konfirmasi pembayaran
        </p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
          Tutup
        </button>
      </div>
    </div>
  );
}
