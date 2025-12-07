"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";

interface ReturnedLoan {
  id: number;
  tanggal_pinjam: string;
  tanggal_kembali: string;
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

export default function ReturnsPage() {
  const [returns, setReturns] = useState<ReturnedLoan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "ontime" | "late">("all");

  useEffect(() => {
    fetchReturns();
  }, []);

  async function fetchReturns() {
    try {
      const supabase = createBrowserSupabase();
      
      const { data, error } = await supabase
        .from("peminjaman")
        .select(`
          id,
          tanggal_pinjam,
          tanggal_kembali,
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
        .eq("status", "dikembalikan")
        .order("tanggal_kembali", { ascending: false });

      if (error) {
        console.error("Error fetching returns:", error);
      } else {
        setReturns(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const getReturnStatus = (batasKembali: string, tanggalKembali: string) => {
    const dueDate = new Date(batasKembali);
    const returnDate = new Date(tanggalKembali);
    return returnDate <= dueDate ? "Tepat Waktu" : "Terlambat";
  };

  const filteredReturns = returns.filter((ret) => {
    if (filter === "all") return true;
    const status = getReturnStatus(ret.batas_kembali, ret.tanggal_kembali);
    if (filter === "ontime") return status === "Tepat Waktu";
    if (filter === "late") return status === "Terlambat";
    return true;
  });

  const exportData = () => {
    const csvContent = [
      ["ID", "Peminjam", "Kelas", "Buku", "Tgl Pinjam", "Tgl Kembali", "Batas Kembali", "Status"],
      ...filteredReturns.map((ret) => [
        ret.id,
        ret.profiles?.nama || "-",
        ret.profiles?.kelas || "-",
        ret.books?.judul || "-",
        ret.tanggal_pinjam,
        ret.tanggal_kembali,
        ret.batas_kembali,
        getReturnStatus(ret.batas_kembali, ret.tanggal_kembali),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-pengembalian-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-center mt-4 text-muted-foreground">Memuat data pengembalian...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          📚 Data Pengembalian Buku
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Riwayat pengembalian buku perpustakaan
        </p>
      </div>

      <Card className="bg-white dark:bg-white/[0.03]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Riwayat Pengembalian ({filteredReturns.length})
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilter("ontime")}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === "ontime"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Tepat Waktu
              </button>
              <button
                onClick={() => setFilter("late")}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === "late"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Terlambat
              </button>
            </div>
          </div>

          {filteredReturns.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Belum ada data pengembalian
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-sky-600 text-white dark:bg-[#FFC428] dark:text-gray-900">
                    <th className="text-left p-3 text-sm font-semibold">ID</th>
                    <th className="text-left p-3 text-sm font-semibold">Peminjam</th>
                    <th className="text-left p-3 text-sm font-semibold">Buku</th>
                    <th className="text-left p-3 text-sm font-semibold">Tgl Pinjam</th>
                    <th className="text-left p-3 text-sm font-semibold">Tgl Kembali</th>
                    <th className="text-left p-3 text-sm font-semibold">Batas Kembali</th>
                    <th className="text-left p-3 text-sm font-semibold">Status</th>
                    <th className="text-left p-3 text-sm font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReturns.map((ret) => {
                    const status = getReturnStatus(ret.batas_kembali, ret.tanggal_kembali);
                    const isLate = status === "Terlambat";

                    return (
                      <tr
                        key={ret.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-200">
                          #{ret.id}
                        </td>
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-200">
                          <div>
                            <p className="font-medium">{ret.profiles?.nama || "-"}</p>
                            <p className="text-xs text-muted-foreground">
                              {ret.profiles?.kelas || ""}
                            </p>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-200">
                          <div>
                            <p className="font-medium">{ret.books?.judul || "-"}</p>
                            <p className="text-xs text-muted-foreground">
                              {ret.books?.penulis || ""}
                            </p>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-200">
                          {new Date(ret.tanggal_pinjam).toLocaleDateString("id-ID")}
                        </td>
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-200">
                          {new Date(ret.tanggal_kembali).toLocaleDateString("id-ID")}
                        </td>
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-200">
                          {new Date(ret.batas_kembali).toLocaleDateString("id-ID")}
                        </td>
                        <td className="p-3 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isLate
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => alert(`Detail pengembalian ID: ${ret.id}`)}
                            className="p-2 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-800 transition"
                            title="Lihat Detail"
                          >
                            <Eye size={18} className="text-sky-600 dark:text-sky-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button onClick={exportData} className="bg-green-600 hover:bg-green-700">
              <Download size={18} className="mr-2" />
              Export Laporan CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}