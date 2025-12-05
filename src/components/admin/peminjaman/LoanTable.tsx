"use client";

import { useEffect, useMemo, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge/Badge";

interface Loan {
  id: number;
  borrower: string;
  book: string;
  tanggal_pinjam: string;
  batas_kembali: string;
  status: string;
}

export default function LoanTable() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("due");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const dendaPerHari = 1000;

  // FETCH DATA
  const fetchLoans = async () => {
    const { data, error } = await SupabaseClient
      .from("peminjaman")
      .select(`
        id,
        tanggal_pinjam,
        batas_kembali,
        status,
        profiles:nama,
        books:title
      `);

    if (!error && data) {
      setLoans(
        data.map((row: any) => ({
          id: row.id,
          borrower: row.profiles?.nama ?? "-",
          book: row.books?.title ?? "-",
          tanggal_pinjam: row.tanggal_pinjam,
          batas_kembali: row.batas_kembali,
          status: row.status
        }))
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // UPDATE STATUS PEMINJAMAN
  const updateStatus = async (id: number, newStatus: string) => {
    await SupabaseClient.from("peminjaman").update({ status: newStatus }).eq("id", id);
    fetchLoans();
  };

  const now = new Date();

  const filtered = useMemo(() => {
    return loans
      .filter((loan) => {
        const isLate = new Date(loan.batas_kembali) < now;

        if (!loan.borrower.toLowerCase().includes(search.toLowerCase()) &&
            !loan.book.toLowerCase().includes(search.toLowerCase())) return false;

        if (filterStatus === "late" && !isLate) return false;
        if (filterStatus === "ontime" && isLate) return false;
        if (filterStatus !== "all" && loan.status !== filterStatus) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.borrower.localeCompare(b.borrower);
        return new Date(a.batas_kembali).getTime() - new Date(b.batas_kembali).getTime();
      });
  }, [search, filterStatus, sortBy, loans]);

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <Card className="bg-[#FFF8E7] dark:bg-white/5 shadow-lg border">
      <CardContent className="p-5">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-2 px-4 rounded-xl">
            <Search className="w-5 h-5 text-slate-500" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              placeholder="Cari peminjam atau buku..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">Filter</SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="menunggu">Menunggu</SelectItem>
                <SelectItem value="dipinjam">Dipinjam</SelectItem>
                <SelectItem value="dikembalikan">Dikembalikan</SelectItem>
                <SelectItem value="late">Terlambat</SelectItem>
                <SelectItem value="ontime">Tepat Waktu</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">Sort</SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nama</SelectItem>
                <SelectItem value="due">Jatuh Tempo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TABEL */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#FFC428]">
              <th className="p-3 text-left">Peminjam</th>
              <th className="p-3 text-left">Buku</th>
              <th className="p-3 text-left">Pinjam</th>
              <th className="p-3 text-left">Tempo</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Denda</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((loan) => {
              const due = new Date(loan.batas_kembali);
              const isLate = due < now;
              const lateDays = isLate
                ? Math.ceil((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
                : 0;
              const fine = lateDays * dendaPerHari;

              return (
                <motion.tr key={loan.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="border-b hover:bg-sky-50 dark:hover:bg-sky-900/30"
                >
                  <td className="p-3">{loan.borrower}</td>
                  <td className="p-3">{loan.book}</td>
                  <td className="p-3">{loan.tanggal_pinjam}</td>
                  <td className="p-3">{loan.batas_kembali}</td>

                  <td className="p-3">
                    <Badge className={isLate ? "bg-red-600" : "bg-green-600"}>
                      {loan.status}
                    </Badge>
                  </td>

                  <td className="p-3">
                    {isLate ? (
                      <span className="text-red-500 font-semibold">
                        Rp {fine.toLocaleString()}
                      </span>
                    ) : "-"}
                  </td>

                  <td className="p-3 flex gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateStatus(loan.id, "dikembalikan")}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => updateStatus(loan.id, "ditolak")}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-5">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            Prev
          </Button>

          <p>Page {currentPage} / {totalPages}</p>

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
