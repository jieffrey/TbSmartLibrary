"use client";

import { useState } from "react";
import { createUser } from "@/app/api/users/route";

export default function AddUserModal({ onClose, onSuccess }: any) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await createUser({
      nama,
      email,
      kelas,
      password,
      role: role as "admin" | "user",
    });

    setLoading(false);

    if (res.success) {
      alert("User berhasil dibuat!");
      onSuccess();
    } else {
      alert("Gagal membuat user: " + res.error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-xl font-semibold mb-4">Tambah User Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="text-sm">Nama</label>
            <input className="w-full p-2 border rounded" required
              value={nama} onChange={e => setNama(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input className="w-full p-2 border rounded" type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Kelas</label>
            <input className="w-full p-2 border rounded"
              value={kelas} onChange={e => setKelas(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input className="w-full p-2 border rounded" type="password" required
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Role</label>
            <select className="w-full p-2 border rounded"
              value={role} onChange={e => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Batal
            </button>

            <button type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
