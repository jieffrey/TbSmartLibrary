"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpDown, CheckCircle } from "lucide-react";
import Badge from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// ===== Dummy Data =====
interface Loan {
  id: string;
  borrower: string;
  book: string;
  start: string;
  due: string;
  returned: boolean;
}

export default function LoanTable() {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "1",
      borrower: "Kalsah Alkautsar",
      book: "Belajar React untuk Pemula",
      start: "2024-01-10",
      due: "2024-01-17",
      returned: false
    },
    {
      id: "2",
      borrower: "Budi Santoso",
      book: "Next.js Fullstack Guide",
      start: "2024-01-05",
      due: "2024-01-08",
      returned: false
    }
  ]);

  // === STATE ===
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const dendaPerHari = 1000;

  // === Check Late + Denda ===
  const now = new Date();

  const filtered = useMemo(() => {
    return loans
      .filter((loan) => {
        const borrower = loan.borrower.toLowerCase();
        const book = loan.book.toLowerCase();
        const q = search.toLowerCase();

        const isLate = new Date(loan.due) < now;

        // Search
        if (!borrower.includes(q) && !book.includes(q)) return false;

        // Filter
        if (filterStatus === "late" && !isLate) return false;
        if (filterStatus === "ontime" && isLate) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.borrower.localeCompare(b.borrower);
        if (sortBy === "due") return new Date(a.due).getTime() - new Date(b.due).getTime();
        return 0;
      });
  }, [loans, search, filterStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Tandai Pengembalian
  const markReturned = (id: string) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id ? { ...loan, returned: true } : loan
      )
    );
  };

  return (
    <Card className="bg-white dark:bg-[#0a0f1e] border dark:border-slate-800 shadow-lg">
      <CardContent className="p-6">

        {/* ==== HEADER: Search + Filter + Sort ==== */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          {/* Search */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-2 px-4 rounded-xl">
            <Search className="w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Cari nama atau buku..."
              className="bg-transparent outline-none text-sm w-full text-slate-700 dark:text-slate-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3">

            {/* Filter */}
            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                Filter Status
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="late">Terlambat</SelectItem>
                <SelectItem value="ontime">Tepat Waktu</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                Urutkan
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nama A-Z</SelectItem>
                <SelectItem value="due">Jatuh Tempo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-sky-600 dark:bg-sky-800 text-white">
                <th className="p-3 text-left text-sm font-semibold">Peminjam</th>
                <th className="p-3 text-left text-sm font-semibold">Buku</th>
                <th className="p-3 text-left text-sm font-semibold">Tanggal Pinjam</th>
                <th className="p-3 text-left text-sm font-semibold">Jatuh Tempo</th>
                <th className="p-3 text-left text-sm font-semibold">Status</th>
                <th className="p-3 text-left text-sm font-semibold">Denda</th>
                <th className="p-3 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((loan) => {
                const dueDate = new Date(loan.due);
                const isLate = dueDate < now;

                const lateDays = Math.max(
                  0,
                  Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
                );

                const fine = lateDays * dendaPerHari;

                return (
                  <motion.tr
                    key={loan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition"
                  >
                    <td className="p-3 text-sm dark:text-slate-200">{loan.borrower}</td>
                    <td className="p-3 text-sm dark:text-slate-200">{loan.book}</td>
                    <td className="p-3 text-sm dark:text-slate-200">{loan.start}</td>
                    <td className="p-3 text-sm dark:text-slate-200">{loan.due}</td>
                    <td className="p-3">
                      <Badge className={isLate ? "bg-red-600" : "bg-green-600"}>
                        {isLate ? "Terlambat" : "Tepat Waktu"}
                      </Badge>
                    </td>

                    <td className="p-3 text-sm font-semibold">
                      {isLate ? (
                        <span className="text-red-500 dark:text-red-300">
                          Rp {fine.toLocaleString()}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3">
                      {!loan.returned ? (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 dark:text-white"
                          onClick={() => markReturned(loan.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Selesai
                        </Button>
                      ) : (
                        <span className="text-green-500">Selesai ✔</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ===== Pagination ===== */}
        <div className="flex justify-between mt-6">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>

          <span className="text-slate-600 dark:text-slate-300">
            Page {currentPage} / {totalPages}
          </span>

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
