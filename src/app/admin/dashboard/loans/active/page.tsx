"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";

interface ActiveLoan {
  id: number;
  tanggal_pinjam: string;
  batas_kembali: string;
  status: string;
  profiles: {
    nama: string;
    kelas: string;
  };
  books: {
    judul: string;
    penulis: string;
  };
}

export default function ActiveLoans() {
  const [loans, setLoans] = useState<ActiveLoan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveLoans();
  }, []);

  async function fetchActiveLoans() {
    try {
      const supabase = createBrowserSupabase();
      
      const { data, error } = await supabase
        .from("peminjaman")
        .select(`
          id,
          tanggal_pinjam,
          batas_kembali,
          status,
          profiles:user_id (
            nama,
            kelas
          ),
          books:book_id (
            judul,
            penulis
          )
        `)
        .eq("status", "dipinjam")
        .order("tanggal_pinjam", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching active loans:", error);
      } else {
        setLoans(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

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
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white flex items-center gap-2">
        <BookOpen /> Daftar Peminjaman Aktif ({loans.length})
      </h2>

      {loans.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          Tidak ada peminjaman aktif saat ini
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-gray-600 dark:text-gray-300">
                <th className="py-3 text-left">Nama Peminjam</th>
                <th className="text-left">Buku</th>
                <th className="text-left">Tanggal Pinjam</th>
                <th className="text-left">Jatuh Tempo</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                const isOverdue = new Date(loan.batas_kembali) < new Date();
                
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
                    <td>
                      <div>
                        <p className="font-medium">{loan.books?.judul || "-"}</p>
                        <p className="text-xs text-muted-foreground">
                          {loan.books?.penulis || ""}
                        </p>
                      </div>
                    </td>
                    <td>
                      {loan.tanggal_pinjam
                        ? new Date(loan.tanggal_pinjam).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td>
                      <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
                        {loan.batas_kembali
                          ? new Date(loan.batas_kembali).toLocaleDateString("id-ID")
                          : "-"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`font-medium ${
                          isOverdue ? "text-red-600" : "text-blue-600"
                        }`}
                      >
                        {isOverdue ? "⚠️ Terlambat" : "Sedang Dipinjam"}
                      </span>
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