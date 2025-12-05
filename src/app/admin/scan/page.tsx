"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScanPage() {
  const scannerRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-scanner");  

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      (decodedText) => {
        console.log("QR RESULT:", decodedText);

        // kirim kode ke API
        fetch("/api/peminjaman/scan", {
          method: "POST",
          body: JSON.stringify({ code: decodedText }),
        }).then(() => {
          alert("QR berhasil discan!");
          html5QrCode.stop();
        });
      },
      (error) => {
        // ignore small errors
      }
    );

    return () => {
      html5QrCode.stop();
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4 text-center">Scan QR Buku</h1>

      <div
        id="qr-scanner"
        ref={scannerRef}
        className="w-full mx-auto rounded-xl overflow-hidden shadow-md"
      ></div>
    </div>
  );
}
