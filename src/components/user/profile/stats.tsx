"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountStats() {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      <Card className="border dark:border-gray-700">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Peminjaman</p>
          <p className="text-2xl font-bold mt-1">42</p>
        </CardContent>
      </Card>

      <Card className="border dark:border-gray-700">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Denda Dibayar</p>
          <p className="text-2xl font-bold mt-1">Rp 14.000</p>
        </CardContent>
      </Card>

      <Card className="border dark:border-gray-700">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Status Akun</p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-1">
            Aktif
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
