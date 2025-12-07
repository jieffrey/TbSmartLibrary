"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

interface Loan {
  id: number;
  user_id: string;
  book_id: number;
  tanggal_pinjam: string;
  tanggal_kembali: string | null;
  batas_kembali: string;
  status: string;
  created_at: string;
  profiles?: {
    nama: string;
    email: string;
    kelas: string;
  };
  books?: {
    judul: string;
    penulis: string;
    image_url: string;
  };
}

export default function LoanTable() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchLoans();
  }, [filter]);

  async function fetchLoans() {
    try {
      setLoading(true);
      const supabase = createBrowserSupabase();

      let query = supabase
        .from("peminjaman")
        .select(`
          *,
          profiles:user_id (
            nama,
            email,
            kelas
          ),
          books:book_id (
            judul,
            penulis,
            image_url
          )
        `)
        .order("created_at", { ascending: false });

      // Filter by status
      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching loans:", error);
        alert(`Gagal memuat data: ${error.message}`);
      } else {
        console.log("Loans data:", data);
        setLoans(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(loanId: number) {
    if (!confirm("Setujui peminjaman ini?")) return;

    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase
        .from("peminjaman")
        .update({
          status: "dipinjam",
          tanggal_pinjam: new Date().toISOString().split("T")[0],
        })
        .eq("id", loanId);

      if (error) {
        alert(`Gagal: ${error.message}`);
      } else {
        alert("Peminjaman disetujui!");
        fetchLoans();
      }
    } catch (error) {
      console.error("Error approving loan:", error);
      alert("Terjadi kesalahan");
    }
  }

  async function handleReject(loanId: number) {
    if (!confirm("Tolak peminjaman ini?")) return;

    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase
        .from("peminjaman")
        .update({ status: "ditolak" })
        .eq("id", loanId);

      if (error) {
        alert(`Gagal: ${error.message}`);
      } else {
        alert("Peminjaman ditolak!");
        fetchLoans();
      }
    } catch (error) {
      console.error("Error rejecting loan:", error);
      alert("Terjadi kesalahan");
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      menunggu: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      dipinjam: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      dikembalikan: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      ditolak: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      menunggu: "Menunggu",
      dipinjam: "Dipinjam",
      dikembalikan: "Dikembalikan",
      ditolak: "Ditolak",
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <Card className="w-full bg-white dark:bg-white/[0.03] shadow-md border border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat data peminjaman...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white dark:bg-white/[0.03] shadow-md border border-gray-200 dark:border-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Daftar Peminjaman ({loans.length})
          </h2>

          {/* Filter */}
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
              onClick={() => setFilter("menunggu")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                filter === "menunggu"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Menunggu
            </button>
            <button
              onClick={() => setFilter("dipinjam")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                filter === "dipinjam"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Dipinjam
            </button>
            <button
              onClick={fetchLoans}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {loans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {filter === "all" 
                ? "Tidak ada data peminjaman" 
                : `Tidak ada peminjaman dengan status "${getStatusLabel(filter)}"`}
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-sky-600 text-white dark:bg-[#FFC428] dark:text-gray-900">
                  <th className="text-left p-3 text-sm font-semibold">Peminjam</th>
                  <th className="text-left p-3 text-sm font-semibold">Buku</th>
                  <th className="text-left p-3 text-sm font-semibold">Tgl Pinjam</th>
                  <th className="text-left p-3 text-sm font-semibold">Batas Kembali</th>
                  <th className="text-left p-3 text-sm font-semibold">Status</th>
                  <th className="text-left p-3 text-sm font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition"
                  >
                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      <div>
                        <p className="font-medium">{loan.profiles?.nama || "-"}</p>
                        <p className="text-xs text-muted-foreground">
                          {loan.profiles?.kelas || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      <div>
                        <p className="font-medium">{loan.books?.judul || "-"}</p>
                        <p className="text-xs text-muted-foreground">
                          {loan.books?.penulis || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      {loan.tanggal_pinjam
                        ? new Date(loan.tanggal_pinjam).toLocaleDateString("id-ID")
                        : "-"}
                    </td>

                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      {loan.batas_kembali
                        ? new Date(loan.batas_kembali).toLocaleDateString("id-ID")
                        : "-"}
                    </td>

                    <td className="p-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          loan.status
                        )}`}
                      >
                        {getStatusLabel(loan.status)}
                      </span>
                    </td>

                    <td className="p-3 flex items-center gap-2">
                      <button

                        onClick={() => redirect(`/admin/dashboard/loans/${loan.id}`)}
                        className="p-2 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-800 transition"
                        title="Lihat Detail"
                      >
                        <Eye size={18} className="text-sky-600 dark:text-sky-400" />
                      </button>

                      {loan.status === "menunggu" && (
                        <>
                          <button
                            onClick={() => handleApprove(loan.id)}
                            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition"
                            title="Setujui"
                          >
                            <CheckCircle
                              size={18}
                              className="text-green-600 dark:text-green-400"
                            />
                          </button>

                          <button
                            onClick={() => handleReject(loan.id)}
                            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition"
                            title="Tolak"
                          >
                            <XCircle size={18} className="text-red-600 dark:text-red-400" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}