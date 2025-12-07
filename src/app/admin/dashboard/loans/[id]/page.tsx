// app/admin/dashboard/peminjaman/[id]/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Book, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

async function getLoanDetail(id: string) {
  const supabase = await createServerSupabaseClient();
  
  // Cek apakah user adalah admin
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();
  
  if (profile?.role !== 'admin') redirect('/');

  // Ambil detail peminjaman dengan relasi ke books dan profiles
  const { data: loan, error } = await supabase
    .from('peminjaman')
    .select(`
      *,
      books:book_id (
        id,
        judul,
        penulis,
        penerbit,
        tahun_terbit,
        isbn,
        image_url,
        kategori,
        stok
      ),
      profiles:user_id (
        id,
        nama,
        email,
        kelas
      )
    `)
    .eq('id', id)
    .single();

  if (error || !loan) {
    return null;
  }

  return loan;
}

export default async function LoanDetailPage({ params }: { params: { id: string } }) {
  const loan = await getLoanDetail(params.id);

  if (!loan) {
    notFound();
  }

  // Hitung durasi peminjaman
  const borrowDate = new Date(loan.tanggal_pinjam);
  const returnDate = loan.tanggal_kembali ? new Date(loan.tanggal_kembali) : null;
  const dueDate = new Date(loan.tanggal_jatuh_tempo);
  const today = new Date();

  const isOverdue = !returnDate && today > dueDate;
  const daysBorrowed = returnDate 
    ? Math.floor((returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24))
    : Math.floor((today.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24));

  // Status badge
  const getStatusBadge = () => {
    switch (loan.status) {
      case 'dipinjam':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300">
            <Clock size={16} />
            Dipinjam
          </span>
        );
      case 'dikembalikan':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300">
            <CheckCircle size={16} />
            Dikembalikan
          </span>
        );
      case 'terlambat':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300">
            <XCircle size={16} />
            Terlambat
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300">
            <AlertCircle size={16} />
            {loan.status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/admin/dashboard/peminjaman"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition mb-4"
          >
            <ArrowLeft size={16} />
            Kembali ke Daftar Peminjaman
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Detail Peminjaman
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                ID: {loan.id}
              </p>
            </div>
            {getStatusBadge()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Info Buku */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-white/[0.03] border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Book size={20} />
                  Informasi Buku
                </h2>
                
                {loan.books && (
                  <div className="space-y-4">
                    {loan.books.image_url && (
                      <img
                        src={loan.books.image_url}
                        alt={loan.books.judul}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {loan.books.judul}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        oleh {loan.books.penulis}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Penerbit:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {loan.books.penerbit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tahun:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {loan.books.tahun_terbit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {loan.books.isbn || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Kategori:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {loan.books.kategori}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Stok:</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {loan.books.stok} buku
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/admin/dashboard/books/${loan.books.id}`}
                      className="block w-full text-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition text-sm"
                    >
                      Lihat Detail Buku
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Kolom Kanan - Info Peminjam & Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Peminjam */}
            <Card className="bg-white dark:bg-white/[0.03] border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User size={20} />
                  Informasi Peminjam
                </h2>
                
                {loan.profiles && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Nama</p>
                            <p className="text-gray-900 dark:text-white font-medium">
                              {loan.profiles.nama}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                            <p className="text-gray-900 dark:text-white font-medium">
                              {loan.profiles.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Kelas</p>
                            <p className="text-gray-900 dark:text-white font-medium">
                              {loan.profiles.kelas || '-'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">ID User</p>
                            <p className="text-gray-900 dark:text-white font-medium text-xs">
                              {loan.profiles.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/admin/dashboard/users/${loan.profiles.id}`}
                      className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                    >
                      Lihat Profile Lengkap
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline Peminjaman */}
            <Card className="bg-white dark:bg-white/[0.03] border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Timeline Peminjaman
                </h2>

                <div className="space-y-4">
                  {/* Tanggal Pinjam */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal Pinjam</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {borrowDate.toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {borrowDate.toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Tanggal Jatuh Tempo */}
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isOverdue 
                        ? 'bg-red-100 dark:bg-red-900/30' 
                        : 'bg-yellow-100 dark:bg-yellow-900/30'
                    }`}>
                      <Clock size={18} className={
                        isOverdue 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-yellow-600 dark:text-yellow-400'
                      } />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal Jatuh Tempo</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {dueDate.toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      {isOverdue && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                          ⚠️ Terlambat {Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))} hari
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tanggal Kembali */}
                  {returnDate && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal Kembali</p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {returnDate.toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {returnDate.toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Info Durasi */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Durasi Peminjaman</p>
                        <p className="text-gray-900 dark:text-white font-semibold text-lg">
                          {daysBorrowed} hari
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Status</p>
                        <p className={`font-semibold text-lg ${
                          loan.status === 'dikembalikan' ? 'text-green-600 dark:text-green-400' :
                          loan.status === 'terlambat' ? 'text-red-600 dark:text-red-400' :
                          'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Catatan Denda */}
                  {loan.denda && loan.denda > 0 && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                        💰 Denda Keterlambatan
                      </p>
                      <p className="text-2xl text-red-700 dark:text-red-300 font-bold mt-1">
                        Rp {loan.denda.toLocaleString('id-ID')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}