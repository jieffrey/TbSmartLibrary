// app/admin/dashboard/users/[id]/history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById, getUserHistory } from "@/app/api/users/route";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function UserHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId]);

  async function loadData() {
    setLoading(true);

    try {
      // Load user info
      const userResult = await getUserById(userId);
      if (userResult.success && userResult.data) {
        setUser(userResult.data);
      } else {
        console.error("Error loading user:", userResult.error);
      }

      // Load history
      const historyResult = await getUserHistory(userId);
      if (historyResult.success && historyResult.data) {
        setHistory(historyResult.data);
      } else {
        console.error("Error loading history:", historyResult.error);
      }
    } catch (error) {
      console.error("Error in loadData:", error);
    } finally {
      setLoading(false);
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
      <div className="p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-center mt-4 text-muted-foreground">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/dashboard/users")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <Card className="bg-white dark:bg-white/[0.03]">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold dark:text-white mb-2">
              Riwayat Peminjaman
            </h1>
            {user && (
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>
                  <strong>Nama:</strong> {user.nama || '-'}
                </span>
                <span>
                  <strong>Email:</strong> {user.email || '-'}
                </span>
                {user.kelas && (
                  <span>
                    <strong>Kelas:</strong> {user.kelas}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <Card className="bg-white dark:bg-white/[0.03]">
          <CardContent className="p-12 text-center">
            <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              User ini belum pernah meminjam buku
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <Card key={item.id} className="bg-white dark:bg-white/[0.03]">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  {/* Book Cover */}
                  <img
                    src={item.books?.image_url || '/placeholder-book.jpg'}
                    alt={item.books?.judul || 'Book cover'}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-book.jpg';
                    }}
                    className="w-20 h-28 object-cover rounded-lg border dark:border-zinc-700"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg dark:text-white">
                          {item.books?.judul || 'Judul tidak tersedia'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.books?.penulis || 'Penulis tidak tersedia'}
                        </p>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <div>
                          <p className="text-xs">Tanggal Pinjam</p>
                          <p className="font-medium dark:text-white">
                            {item.tanggal_pinjam
                              ? new Date(item.tanggal_pinjam).toLocaleDateString('id-ID')
                              : new Date(item.created_at).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock size={16} />
                        <div>
                          <p className="text-xs">Batas Kembali</p>
                          <p className="font-medium dark:text-white">
                            {item.batas_kembali
                              ? new Date(item.batas_kembali).toLocaleDateString('id-ID')
                              : '-'}
                          </p>
                        </div>
                      </div>

                      {item.tanggal_kembali && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={16} />
                          <div>
                            <p className="text-xs">Tanggal Kembali</p>
                            <p className="font-medium dark:text-white">
                              {new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}