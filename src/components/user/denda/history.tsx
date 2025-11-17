"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function RiwayatDenda() {
  const riwayat = [
    {
      id: 1,
      title: "Rich Dad Poor Dad",
      tanggal: "12 Nov 2025",
      total: 4000,
    },
    {
      id: 2,
      title: "The Psychology of Money",
      tanggal: "02 Nov 2025",
      total: 2000,
    },
  ];

  return (
    <div className="space-y-4">
      {riwayat.map((item) => (
        <Card key={item.id} className="border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dibayar: {item.tanggal}
              </p>
              <p className="text-sm">
                Total: <span className="font-semibold">Rp {item.total.toLocaleString()}</span>
              </p>
            </div>

            <CheckCircle className="text-green-600 dark:text-green-500" size={28} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
