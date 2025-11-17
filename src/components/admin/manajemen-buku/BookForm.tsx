"use client";
import React from "react";

export default function BookForm() {
  return (
    <div className="
      rounded-2xl border border-gray-200 bg-white 
      dark:border-gray-700 dark:bg-gray-900/40
      p-6 mt-6
    ">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Tambah / Edit Buku
      </h3>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Judul Buku</label>
          <input
            type="text"
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Penulis</label>
          <input
            type="text"
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Penerbit</label>
          <input
            type="text"
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Tahun Terbit</label>
          <input
            type="number"
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Kategori</label>
          <select
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option>Novel</option>
            <option>Pelajaran</option>
            <option>Self Development</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Jumlah Eksemplar</label>
          <input
            type="number"
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        <div className="col-span-full">
          <label className="text-sm text-gray-600 dark:text-gray-300">Sinopsis</label>
          <textarea
            rows={4}
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          ></textarea>
        </div>

        <div className="col-span-full">
          <button
            className="px-5 py-3 rounded-xl bg-blue-600 text-white 
              hover:bg-blue-700 transition w-fit"
          >
            Simpan Buku
          </button>
        </div>
      </form>
    </div>
  );
}
