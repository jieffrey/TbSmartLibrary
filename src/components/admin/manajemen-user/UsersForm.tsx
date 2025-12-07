"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser, type User } from "@/app/api/users/route";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";

type UserFormProps = {
  user: User;
};

export default function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: user.nama || "",
    kelas: user.kelas || "",
    role: user.role || "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama.trim()) {
      alert("Nama wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const result = await updateUser(user.id, formData);

      if (!result.success) {
        alert(`Gagal: ${result.error}`);
        return;
      }

      alert("Data user berhasil diupdate");
      router.push("/admin/dashboard/users");
      router.refresh();
    } catch (error: any) {
      alert(`Error: ${error.message || "Terjadi kesalahan"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
        {/* EMAIL (READ ONLY) */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={user.email || ''}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400
              cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Email tidak dapat diubah
          </p>
        </div>

        {/* NAMA */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
              transition-all duration-200"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        {/* KELAS */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Kelas
          </label>
          <input
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
              transition-all duration-200"
            placeholder="Contoh: XII IPA 1"
          />
        </div>

        {/* ROLE */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
              transition-all duration-200"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Admin memiliki akses penuh ke sistem
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 justify-end">
        <Link
          href="/admin/dashboard/users"
          className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-300 font-semibold
            hover:bg-gray-50 dark:hover:bg-gray-800
            transition-all duration-200 flex items-center gap-2"
        >
          <X size={20} />
          Batal
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-[#FFC428] text-black font-semibold
            hover:bg-[#FFD666] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save size={20} />
              Simpan Perubahan
            </>
          )}
        </button>
      </div>
    </form>
  );
}