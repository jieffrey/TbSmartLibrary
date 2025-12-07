"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";

type BookFormProps = {
  book?: Book;
  mode: "add" | "edit";
};

export default function BookForm({ book, mode }: BookFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    judul: book?.judul || "",
    penulis: book?.penulis || "",
    penerbit: book?.penerbit || "",
    tahun_terbit: book?.tahun_terbit || "",
    kategori: book?.kategori || "",
    stok: book?.stok || 0,
    image_url: book?.image_url || "",
    shelf_location: book?.shelf_location || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stok" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submit clicked");
  console.log("Form Data:", formData);

  if (!formData.judul.trim()) {
    toast({
      title: "Error",
      description: "Judul buku wajib diisi",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);

  try {
    const url = mode === "add" ? "/api/books" : `/api/books/${book!.id}`;
    console.log("Sending request to", url, "with method", mode === "add" ? "POST" : "PATCH");

    const res = await fetch(url, {
      method: mode === "add" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("Raw response:", res);

    const result = await res.json();
    console.log("Parsed response:", result);

    if (!result.success) {
      toast({
        title: "Gagal",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    alert(`Buku berhasil ${mode === "add" ? "ditambahkan" : "diupdate"}`);
    router.push("/admin/dashboard/books");
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Terjadi kesalahan",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  const kategoriOptions = [
    "Fiksi",
    "Non-Fiksi",
    "Sains",
    "Teknologi",
    "Sejarah",
    "Biografi",
    "Pendidikan",
    "Agama",
    "Komik",
    "Majalah",
    "Lainnya",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03] p-6">
        {/* JUDUL */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Judul Buku <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
              transition-all duration-200"
            placeholder="Masukkan judul buku"
          />
        </div>

        {/* PENULIS */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Penulis
          </label>
          <input
            type="text"
            name="penulis"
            value={formData.penulis}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
              transition-all duration-200"
            placeholder="Nama penulis"
          />
        </div>

        {/* PENERBIT & TAHUN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Penerbit
            </label>
            <input
              type="text"
              name="penerbit"
              value={formData.penerbit}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
                transition-all duration-200"
              placeholder="Nama penerbit"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tahun Terbit
            </label>
            <input
              type="text"
              name="tahun_terbit"
              value={formData.tahun_terbit}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
                transition-all duration-200"
              placeholder="2024"
              maxLength={4}
            />
          </div>
        </div>

        {/* KATEGORI & STOK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
                transition-all duration-200"
            >
              <option value="">Pilih kategori</option>
              {kategoriOptions.map((kat) => (
                <option key={kat} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Stok <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stok"
              value={formData.stok}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
                transition-all duration-200"
              placeholder="0"
            />
          </div>
        </div>

        {/* IMAGE URL */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            URL Gambar Cover
          </label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
              transition-all duration-200"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        {/* SHELF LOCATION */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Lokasi Rak
          </label>
          <input
            type="text"
            name="shelf_location"
            value={formData.shelf_location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#FFC428] focus:border-transparent
              transition-all duration-200"
            placeholder="Rak A-12"
          />
        </div>

        {/* PREVIEW IMAGE */}
        {formData.image_url && (
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Preview Cover
            </label>
            <div className="relative w-32 h-48 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
              <img
                src={formData.image_url}
                alt="Cover preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-book.png";
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 justify-end">
        <Link
          href="/admin"
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
              {mode === "add" ? "Tambah Buku" : "Simpan Perubahan"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

