  "use client";

  import { Calendar, Clock } from "lucide-react";
  import { Button } from "@/components/ui/button";

  export default function HistoryCard({ item, onDetail }) {
    // ✅ STATUS HANDLING - Bahasa Indonesia sesuai database
    const isWaiting = item.status === "menunggu";
    const isBorrowed = item.status === "dipinjam";
    const isReturned = item.status === "dikembalikan";
    const isRejected = item.status === "ditolak";
    
    // Cek keterlambatan
    const isLate = isBorrowed && item.batas_kembali && new Date(item.batas_kembali) < new Date();

    // ✅ LABEL STATUS - Bahasa Indonesia
    const renderStatus = () => {
      if (isLate) return "Terlambat";
      
      switch (item.status) {
        case "menunggu":
          return "Menunggu Konfirmasi";
        case "dipinjam":
          return "Sedang Dipinjam";
        case "dikembalikan":
          return "Dikembalikan";
        case "ditolak":
          return "Ditolak";
        default:
          return "Tidak Diketahui";
      }
    };

    // WARNA STATUS BADGE
    const getStatusClass = () => {
      if (isLate) return "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300";
      if (isWaiting) return "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      if (isBorrowed) return "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      if (isReturned) return "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300";
      if (isRejected) return "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      return "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    };

    return (
      <div className="bg-white dark:bg-white/[0.03] border dark:border-zinc-800 p-5 rounded-xl shadow-sm flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold dark:text-white">
              {item.books?.judul || 'Judul tidak tersedia'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.books?.penulis || 'Penulis tidak tersedia'}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass()}`}>
            {renderStatus()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} /> Pinjam:{" "}
            {item.tanggal_pinjam 
              ? new Date(item.tanggal_pinjam).toLocaleDateString('id-ID')
              : new Date(item.created_at).toLocaleDateString('id-ID')}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} /> Batas:{" "}
            {item.batas_kembali
              ? new Date(item.batas_kembali).toLocaleDateString('id-ID')
              : "-"}
          </div>
        </div>

        <Button variant="outline" className="mt-2" onClick={() => onDetail(item)}>
          Lihat Detail
        </Button>
      </div>
    );
  }