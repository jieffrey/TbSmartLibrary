// components/admin/manajemen-user/UserTable.tsx
'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Eye } from "lucide-react";
import { getAllUsers, deleteUser, toggleUserRole, type User } from "@/app/api/users/route";
import AddUserModal from "./AddUsers";
import { redirect } from "next/navigation";

type UserTableProps = {
  users?: User[];
};

export default function UserTable({ users: initialUsers }: UserTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers || []);
  const [loading, setLoading] = useState(!initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => {
    if (!initialUsers) {
      loadUsers();
    }
  }, [initialUsers]);

  async function loadUsers() {
    setLoading(true);
    const result = await getAllUsers();
    
    if (result.success && result.data) {
      setUsers(result.data);
    } else {
      console.error("Error loading users:", result.error);
      alert(`Gagal memuat data user: ${result.error}`);
    }
    
    setLoading(false);
  }

  async function handleDelete(userId: string, userName: string) {
    if (!confirm(`Apakah Anda yakin ingin menghapus user "${userName}"?\n\nTindakan ini tidak dapat dibatalkan!`)) {
      return;
    }

    const result = await deleteUser(userId);
    
    if (result.success) {
      alert("User berhasil dihapus");
      loadUsers(); // Reload data
    } else {
      alert(`Gagal menghapus user: ${result.error}`);
    }
  }

  async function handleToggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    
    if (!confirm(`Ubah role menjadi "${newRole}"?`)) {
      return;
    }

    const result = await toggleUserRole(userId);
    
    if (result.success) {
      alert("Role berhasil diubah");
      loadUsers(); // Reload data
    } else {
      alert(`Gagal mengubah role: ${result.error}`);
    }
  }

  function handleViewHistory(user: User) {
    redirect(`/admin/dashboard/users/${user.id}/history`);
  }

  function handleEdit(user: User) {
    redirect(`/admin/dashboard/users/${user.id}/edit`);
  }

  if (loading) {
    return (
      <Card className="w-full bg-white dark:bg-white/[0.03] shadow-md border border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat data pengguna...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white dark:bg-white/[0.03] shadow-md border border-gray-200 dark:border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Daftar Pengguna ({users.length})
        </h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={loadUsers}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Tambah User
          </button>
        </div>
      </div>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada data pengguna</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-sky-600 text-white dark:bg-[#FFC428] dark:text-gray-900">
                  <th className="text-left p-3 text-sm font-semibold">Nama</th>
                  <th className="text-left p-3 text-sm font-semibold">Email</th>
                  <th className="text-left p-3 text-sm font-semibold">Kelas</th>
                  <th className="text-left p-3 text-sm font-semibold">Role</th>
                  <th className="text-left p-3 text-sm font-semibold">Terdaftar</th>
                  <th className="text-left p-3 text-sm font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition"
                  >
                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      {user.nama || '-'}
                    </td>

                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      {user.email || '-'}
                    </td>

                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      {user.kelas || '-'}
                    </td>

                    <td className="p-3 text-sm">
                      <button
                        onClick={() => handleToggleRole(user.id, user.role || 'user')}
                        className="group relative"
                        title="Klik untuk ubah role"
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-700/30 dark:text-purple-300 hover:bg-purple-200"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300 hover:bg-blue-200"
                          }`}
                        >
                          {user.role || 'user'}
                        </span>
                        <span className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded whitespace-nowrap z-10">
                          Klik untuk ubah role
                        </span>
                      </button>
                    </td>

                    <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                      {user.created_at 
                        ? new Date(user.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })
                        : '-'}
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewHistory(user)}
                          className="p-2 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-800 transition"
                          title="Lihat Riwayat Peminjaman"
                        >
                          <Eye size={18} className="text-sky-600 dark:text-sky-400" />
                        </button>

                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800 transition"
                          title="Edit User"
                        >
                          <Pencil size={18} className="text-amber-600 dark:text-amber-400" />
                        </button>

                        <button
                          onClick={() => handleDelete(user.id, user.nama || user.email || 'User')}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition"
                          title="Hapus User"
                        >
                          <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
      {showAddModal && (
  <AddUserModal
    onClose={() => setShowAddModal(false)}
    onSuccess={() => {
      loadUsers();
      setShowAddModal(false);
    }}
  />
)}

    </Card>
  );
}