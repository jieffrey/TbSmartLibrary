"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";

interface OverdueLoan {
  id: number;
  tanggal_pinjam: string;
  batas_kembali: string;
  tanggal_kembali: string | null;
  status: string;
  profiles: {
    nama: string;
    kelas: string;
  };
  books: {
    judul: string;
  };
  denda: {
    jumlah: number;
    status: string;
    hari_terlambat: number;
  }[];
}

export default function OverdueLoans() {
  const [overdueLoans, setOverdueLoans] = useState<OverdueLoan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverdueLoans();
  }, []);

  async function fetchOverdueLoans() {
    try {
      const supabase = createBrowserSupabase();
      
      const today = new Date().toISOString().split("T")[0];
      
      const { data, error } = await supabase
        .from("peminjaman")
        .select(`
          id,
          tanggal_pinjam,
          batas_kembali,
          tanggal_kembali,
          status,
          profiles:user_id (
            nama,
            kelas
          ),
          books:book_id (
            judul
          ),
          denda (
            jumlah,
            status,
            hari_terlambat
          )
        `)
        .eq("status", "dipinjam")
        .lt("batas_kembali", today)
        .order("batas_kembali", { ascending: true });

      if (error) {
        console.error("Error fetching overdue loans:", error);
      } else {
        setOverdueLoans(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const calculateFine = (batasKembali: string): number => {
    const dueDate = new Date(batasKembali);
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 1000 : 0; // Rp 1.000 per hari
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white">
        ⚠️ Daftar Peminjaman Terlambat ({overdueLoans.length})
      </h2>

      {overdueLoans.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          Tidak ada peminjaman yang terlambat 🎉
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b dark:text-gray-300">
                <th className="py-3">Nama</th>
                <th>Buku</th>
                <th>Jatuh Tempo</th>
                <th>Terlambat</th>
                <th>Denda (Rp)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {overdueLoans.map((loan) => {
                const dueDate = new Date(loan.batas_kembali);
                const today = new Date();
                const diffTime = today.getTime() - dueDate.getTime();
                const daysLate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const fine = calculateFine(loan.batas_kembali);
                const dendaInfo = loan.denda?.[0];

                return (
                  <tr
                    key={loan.id}
                    className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{loan.profiles?.nama || "-"}</p>
                        <p className="text-xs text-muted-foreground">
                          {loan.profiles?.kelas || ""}
                        </p>
                      </div>
                    </td>
                    <td>{loan.books?.judul || "-"}</td>
                    <td>
                      {loan.batas_kembali
                        ? new Date(loan.batas_kembali).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td>
                      <span className="text-red-600 font-semibold">
                        {daysLate} hari
                      </span>
                    </td>
                    <td>
                      <span className="font-semibold">
                        {dendaInfo ? dendaInfo.jumlah.toLocaleString() : fine.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      {dendaInfo?.status === "lunas" ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" /> Lunas
                        </span>
                      ) : (
                        <span className="flex items-center text-red-500">
                          <AlertCircle size={16} className="mr-1" /> Belum Dibayar
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}