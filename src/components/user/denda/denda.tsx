"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import QRModal from "./qris";

export default function DendaAktif() {
  const [dendaList, setDendaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrOpen, setQROpen] = useState(false);
  const [selectedDenda, setSelectedDenda] = useState<any>(null);

  useEffect(() => {
    loadDenda();
  }, []);

  async function loadDenda() {
    setLoading(true);
    try {
      // 👇 Kalau API belum siap, pakai mock data
      const result = {
        data: [
          {
            id: 1,
            jumlah: 15000,
            hari_terlambat: 3,
            peminjaman: {
              books: { judul: "Clean Code", penulis: "Robert C. Martin" }
            }
          },
          {
            id: 2,
            jumlah: 20000,
            hari_terlambat: 4,
            peminjaman: {
              books: { judul: "Atomic Habits", penulis: "James Clear" }
            }
          }
        ]
      };

      setDendaList(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleQR(denda: any) {
    setSelectedDenda(denda);
    setQROpen(true);
  }

  return (
    <div className="space-y-4">
      {loading && <p>Memuat denda...</p>}
      {!loading && dendaList.length === 0 && <p>Tidak ada denda aktif</p>}

      {dendaList.map((item) => (
        <Card key={item.id} className="border dark:border-zinc-700 dark:bg-white/[0.03]">
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.peminjaman.books?.judul}</p>
              <p className="text-sm">{item.peminjaman.books?.penulis}</p>
              <p className="text-sm text-red-500">
                Terlambat {item.hari_terlambat} hari • Rp {item.jumlah.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleQR(item)}>QRIS</Button>
              <Button
                onClick={async () => {
                  // Simulasi bayar manual
                  alert(`Denda ${item.jumlah.toLocaleString()} dibayar manual`);
                  // Hapus dari list agar card hilang
                  setDendaList((prev) => prev.filter((d) => d.id !== item.id));
                }}
              >
                Bayar Manual
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {selectedDenda && (
        <QRModal
          isOpen={qrOpen}
          onClose={() => setQROpen(false)}
          dendaId={selectedDenda.id}
          amount={selectedDenda.jumlah}
        />
      )}
    </div>
  );
}
