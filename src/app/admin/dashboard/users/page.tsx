// app/admin/dashboard/users/page.tsx
import { getAllUsers } from "@/app/api/users/route";
import UserTable from "@/components/admin/manajemen-user/UserTable";

export default async function UsersPage() {
  const result = await getAllUsers();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            👥 Kelola Pengguna
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manajemen user dan role perpustakaan
          </p>
        </div>

        {/* STATS */}
        {result.success && result.data && (
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Admin</div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {result.data.filter(u => u.role === 'admin').length}
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">User</div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {result.data.filter(u => u.role !== 'admin').length}
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">Total</div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {result.data.length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ERROR STATE */}
      {!result.success && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 mb-6">
          <p className="text-red-700 dark:text-red-400 font-medium">
            ⚠️ Error: {result.error}
          </p>
          <p className="text-sm text-red-600 dark:text-red-500 mt-2">
            Pastikan Anda login sebagai admin untuk melihat halaman ini.
          </p>
        </div>
      )}

      {/* TABLE */}
      {result.success && <UserTable users={result.data || []} />}
    </div>
  );
}