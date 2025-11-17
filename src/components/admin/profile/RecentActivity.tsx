"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdLock } from "react-icons/md";

export default function ProfileActivity() {
  // DATA DUMMY (DI-COMMENT) — nanti ambil dari MySQL
  // const activities = [
  //   "Returned 'Atomic Habits'",
  //   "Borrowed 'The Psychology of Money'",
  //   "Updated profile picture",
  //   "Changed password",
  // ];

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleEscape = (event: any) => {
      if (event.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // --- MODAL COMPONENT ---
  const Modal = () => (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      style={{ zIndex: 999999 }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md max-h-full"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="rounded-lg bg-white shadow-lg dark:bg-gray-700 mx-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Riwayat Login
            </h3>

            <button
              type="button"
              className="rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            <ol className="relative ms-3.5 mb-4 border-s border-gray-200 dark:border-gray-600">
              {/* DATA DUMMY LOGIN (DI-COMMENT) */}
              {/* 
              <li className="mb-10 ms-8">
                <span className="absolute -start-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-600 dark:ring-gray-700">
                  <MdLock className="h-2.5 w-2.5 text-gray-500 dark:text-gray-400" />
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Login Berhasil
                </h3>
                <time className="block text-sm text-gray-500 dark:text-gray-400">
                  21 Oktober 2024, 10:30 WIB
                </time>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Akses dari perangkat baru: Google Chrome.
                </p>
              </li>
              */}
            </ol>

            <button
              onClick={toggleModal}
              className="w-full rounded-lg bg-[#294B29] px-5 py-2.5 text-white hover:bg-[#86A789] dark:bg-[#86A789] dark:hover:bg-[#294B29]"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* --- ACTIVITY SECTION (DATA DI-COMMENT) --- */}
      <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Recent Activities
        </h2>

        <div className="space-y-4">
          {/* 
          {activities.map((a, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              {a}
            </div>
          ))} 
          */}
        </div>
      </section>

      {/* --- SECURITY SECTION --- */}
      <div className="mt-8 flex flex-col w-full max-w-2xl rounded-[20px] bg-white p-6 shadow-md dark:bg-navy-800">
        <div className="flex flex-col items-center py-8 mb-6">
          <MdLock className="text-[80px] text-black opacity-15 dark:text-white mb-4" />
          <h4 className="text-2xl font-bold dark:text-white">Keamanan Akun</h4>
          <p className="text-sm text-gray-600">Pantau aktivitas mencurigakan</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-bold dark:text-white">
            Aktivitas Login
          </h4>
          <p className="text-base text-gray-600">
            Tinjau riwayat login terakhir untuk mendeteksi akses tidak sah.
          </p>

          <button
            onClick={toggleModal}
            className="inline-flex items-center justify-center rounded-xl bg-[#294B29] px-6 py-3 text-base font-medium text-white hover:bg-[#86A789]"
          >
            Lihat Riwayat Login
          </button>
        </div>
      </div>

      {isModalOpen && createPortal(<Modal />, document.body)}
    </>
  );
}
