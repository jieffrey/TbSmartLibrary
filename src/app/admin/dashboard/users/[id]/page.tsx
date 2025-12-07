// app/admin/dashboard/users/[id]/page.tsx
import { getUserById } from "@/app/api/users/route";
import { ArrowLeft, Pencil, Trash2, Mail, GraduationCap, Shield, User as UserIcon, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteUserButton from "@/components/admin/manajemen-user/DeleteUserButton";

type UserDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailPage(props: UserDetailPageProps) {
  const params = await props.params;
  const result = await getUserById(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const user = result.data;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* BREADCRUMB */}
      <Link
        href="/admin/dashboard/users"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
          hover:text-[#FFC428] transition-colors mb-6 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Daftar User
      </Link>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            👤 Detail User
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Informasi lengkap tentang user ini
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <Link
            href={`/admin/dashboard/users/${user.id}/edit`}
            className="px-4 py-2.5 rounded-xl bg-[#FFC428] text-black font-semibold
              hover:bg-[#FFD666] hover:shadow-lg hover:scale-[1.02]
              transition-all duration-200 flex items-center gap-2"
          >
            <Pencil size={18} />
            Edit
          </Link>

          <DeleteUserButton userId={user.id} userName={user.nama || user.email || 'User'} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT - PROFILE CARD */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
          <div className="flex flex-col items-center text-center">
            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFC428] to-[#FFD666] flex items-center justify-center text-black text-3xl font-bold mb-4">
              {user.nama ? user.nama.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || '?'}
            </div>

            {/* NAME */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
              {user.nama || 'Tanpa Nama'}
            </h2>

            {/* KELAS */}
            {user.kelas && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {user.kelas}
              </p>
            )}

            {/* ROLE BADGE */}
            <div className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 mb-4
              ${user.role === 'admin'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
              {user.role === 'admin' ? <Shield className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
              {user.role === 'admin' ? 'Admin' : 'User'}
            </div>

            {/* USER ID */}
            <div className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">User ID</p>
              <p className="font-mono text-xs text-gray-800 dark:text-white break-all">
                {user.id}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          {/* CONTACT INFO */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              📞 Informasi Kontak
            </h3>

            <div className="space-y-4">
              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                  <p className="font-medium text-gray-800 dark:text-white break-all">
                    {user.email || '-'}
                  </p>
                </div>
              </div>

              {/* KELAS */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kelas</p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {user.kelas || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* METADATA */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline
            </h3>
            
            <div className="space-y-3">
              {user.created_at && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Terdaftar</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}

              {user.updated_at && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Terakhir Diupdate</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {new Date(user.updated_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ROLE INFO */}
          <div className={`rounded-2xl border p-6 ${
            user.role === 'admin'
              ? "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20"
              : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
          }`}>
            <div className="flex items-start gap-3">
              {user.role === 'admin' ? (
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              ) : (
                <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              )}
              <div>
                <h3 className={`font-bold mb-1 ${
                  user.role === 'admin'
                    ? "text-purple-800 dark:text-purple-300"
                    : "text-blue-800 dark:text-blue-300"
                }`}>
                  {user.role === 'admin' ? 'Administrator' : 'User Biasa'}
                </h3>
                <p className={`text-sm ${
                  user.role === 'admin'
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}>
                  {user.role === 'admin'
                    ? 'Memiliki akses penuh untuk mengelola sistem perpustakaan'
                    : 'Dapat meminjam buku dan melihat koleksi perpustakaan'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}