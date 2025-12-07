"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function RiwayatDenda() {
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiwayat();
  }, []);

  async function fetchRiwayat() {
    setLoading(true);
    try {
      const res = await fetch("/api/denda/riwayat");
      const result = await res.json();
      if (res.ok) setRiwayat(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Memuat riwayat...</p>;
  if (riwayat.length === 0) return <p>Tidak ada riwayat pembayaran</p>;

  return (
    <div className="space-y-4">
      {riwayat.map((item) => (
        <Card key={item.id} className="border dark:border-zinc-700 dark:bg-white/[0.03]">
          <CardContent className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.peminjaman.books?.judul}</h3>
              <p className="text-sm">Dibayar: {new Date(item.confirmed_at).toLocaleDateString()}</p>
              <p className="text-sm">Total: Rp {item.jumlah.toLocaleString()}</p>
            </div>
            <CheckCircle className="text-green-600 dark:text-green-500" size={28} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
