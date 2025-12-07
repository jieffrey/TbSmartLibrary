"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Loader2, Camera, CheckCircle, XCircle } from "lucide-react";

export default function ScanPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let html5QrCode: Html5Qrcode;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("qr-scanner");
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
          async (decodedText) => {
            console.log("📌 QR detected:", decodedText);
            setIsScanning(true);

            try {
              const payload = JSON.parse(decodedText);

              const response = await fetch("/api/peminjaman/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              const result = await response.json();

              if (response.ok) {
                console.log("✅ Scan success:", result);
                setSuccess("QR berhasil discan! ✓");
                setError("");

                await html5QrCode.stop();

                setTimeout(() => {
                  setSuccess("");
                  startScanner();
                }, 2000);
              } else {
                console.log("❌ Scan failed:", result);
                setError(`Error: ${result.error}`);
                setSuccess("");
              }
            } catch (err: any) {
              console.log("❌ Parse error:", err);
              setError(`Parse error: ${err.message}`);
              setSuccess("");
            } finally {
              setIsScanning(false);
            }
          },
          (errorMessage) => {
            // Optional: log minor scan errors
            // console.warn("Scan error:", errorMessage);
          }
        );
      } catch (err: any) {
        console.log("❌ Scanner failed to start:", err);
        setError(`Gagal memulai scanner: ${err.message}`);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((err) => {
          console.log("❌ Error stopping scanner:", err);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Scan QR Code Peminjaman
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Arahkan kamera ke QR code buku
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200 font-medium">
              {success}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
          </div>
        )}

        {/* Scanner */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-4 border-blue-500">
          {isScanning && (
            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center z-10">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            </div>
          )}
          <div id="qr-scanner" className="w-full aspect-square" />
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
            💡 Pastikan QR code terlihat jelas dan tidak blur
          </p>
        </div>
      </div>
    </div>
  );
}
