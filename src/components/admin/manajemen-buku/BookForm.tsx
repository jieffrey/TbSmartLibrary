"use client";

import React, { useState } from "react";
import { BookFormData } from "@/app/api/books/route";
import { Loader2 } from "lucide-react";

type BookFormProps = {
  defaultValues?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => Promise<void>;
  isEdit?: boolean;
  loading?: boolean;
};

export default function BookForm({ 
  defaultValues, 
  onSubmit, 
  isEdit = false,
  loading: externalLoading = false 
}: BookFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BookFormData>({
    judul: defaultValues?.judul || "",
    penulis: defaultValues?.penulis || "",
    penerbit: defaultValues?.penerbit || "",
    tahun_terbit: defaultValues?.tahun_terbit || "",
    kategori: defaultValues?.kategori || "Novel",
    stok: defaultValues?.stok || 0,
    sinopsis: defaultValues?.sinopsis || "",
    image_url: defaultValues?.image_url || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stok" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loading || externalLoading;

  return (
    <div className="
      rounded-2xl border border-gray-200 bg-white 
      dark:border-gray-700 dark:bg-white/[0.03]
      p-6 shadow-sm
    ">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        {isEdit ? (
          <>
            <span className="text-[#FFC428]">✏️</span> Edit Buku
          </>
        ) : (
          <>
            <span className="text-[#FFC428]">➕</span> Tambah Buku Baru
          </>
        )}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* JUDUL */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Judul Buku <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Masukkan judul buku"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          />
        </div>

        {/* PENULIS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Penulis
          </label>
          <input
            type="text"
            name="penulis"
            value={formData.penulis}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Nama penulis"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          />
        </div>

        {/* PENERBIT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Penerbit
          </label>
          <input
            type="text"
            name="penerbit"
            value={formData.penerbit}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Nama penerbit"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          />
        </div>

        {/* TAHUN TERBIT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tahun Terbit
          </label>
          <input
            type="text"
            name="tahun_terbit"
            value={formData.tahun_terbit}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="2024"
            maxLength={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          />
        </div>

        {/* KATEGORI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kategori
          </label>
          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            <option value="Novel">Novel</option>
            <option value="Pelajaran">Pelajaran</option>
            <option value="Self Development">Self Development</option>
            <option value="Fantasi">Fantasi</option>
            <option value="Biografi">Biografi</option>
            <option value="Sejarah">Sejarah</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* STOK */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Jumlah Stok <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stok"
            value={formData.stok}
            onChange={handleChange}
            required
            min={0}
            disabled={isLoading}
            placeholder="0"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          />
        </div>

        {/* URL GAMBAR */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL Gambar
          </label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          />
        </div>

        {/* SINOPSIS */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sinopsis
          </label>
          <textarea
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            disabled={isLoading}
            rows={4}
            placeholder="Deskripsi singkat tentang buku..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:border-[#FFC428] focus:ring-2 focus:ring-[#FFC428]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 resize-none"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="sm:col-span-2 flex justify-end gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 rounded-xl bg-[#FFC428] text-black font-semibold
              hover:bg-[#FFD666] hover:shadow-lg hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              transition-all duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                {isEdit ? "Menyimpan..." : "Menambahkan..."}
              </>
            ) : (
              <>{isEdit ? "💾 Simpan Perubahan" : "➕ Tambah Buku"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}