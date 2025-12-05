"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import QRISModal from "./qris";


export default function DendaAktifList() {
  const [openQR, setOpenQR] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const dendaAktif = [
    {
      id: 1,
      title: "Clean Code",
      terlambat: 3,
      denda: 6000,
    },
    {
      id: 2,
      title: "Atomic Habits",
      terlambat: 1,
      denda: 2000,
    },
  ];

  const handleBayar = (amount) => {
    setSelectedAmount(amount);
    setOpenQR(true);
  };

  return (
    <div className="space-y-4">
      {dendaAktif.map((item) => (
        <Card key={item.id} className="border border-gray-200 dark:border-gray-700 dark:bg-white/[0.03]">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={16} /> Terlambat {item.terlambat} hari
              </p>
              <p className="text-sm mt-1">Denda: <span className="font-semibold">Rp {item.denda.toLocaleString()}</span></p>
            </div>

            <Button onClick={() => handleBayar(item.denda)}>Bayar</Button>
          </CardContent>
        </Card>
      ))}

      <QRISModal open={openQR} onClose={() => setOpenQR(false)} amount={selectedAmount} />
    </div>
  );
}
