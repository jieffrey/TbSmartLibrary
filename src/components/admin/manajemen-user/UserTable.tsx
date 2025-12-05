'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Eye } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "aktif" | "nonaktif";
}

export default function UserTable() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Kalsah Alkautsar",
      email: "kalsah@example.com",
      role: "admin",
      status: "aktif",
    },
    {
      id: "2",
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "user",
      status: "nonaktif",
    },
  ]);

  return (
    <Card className="w-full bg-white dark:bg-white/[0.03] shadow-md border border-gray-200 dark:border-gray-800">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
          Daftar Pengguna
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bgsky text-white dark:bg-[#FFC428]">
                <th className="text-left p-3 text-sm font-semibold">Nama</th>
                <th className="text-left p-3 text-sm font-semibold">Email</th>
                <th className="text-left p-3 text-sm font-semibold">Role</th>
                <th className="text-left p-3 text-sm font-semibold">Status</th>
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
                    {user.name}
                  </td>

                  <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                    {user.email}
                  </td>

                  <td className="p-3 text-sm text-slate-700 dark:text-gray-200">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-700/30 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "aktif"
                          ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-3 flex items-center gap-3">
                    <button
                      className="p-2 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-800 transition"
                      title="Lihat Riwayat"
                    >
                      <Eye size={18} className="text-sky-600 dark:text-sky-400" />
                    </button>

                    <button
                      className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800 transition"
                      title="Edit User"
                    >
                      <Pencil size={18} className="text-amber-600 dark:text-amber-400" />
                    </button>

                    <button
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition"
                      title="Hapus User"
                    >
                      <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </CardContent>
    </Card>
  );
}
