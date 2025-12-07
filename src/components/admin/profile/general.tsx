"use client";

import { useState } from "react";
import { Card } from '@/components/ui/card';

export default function ProfileGeneral() {
  const [profileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <>
      <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow mt-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Personal Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {["Full Name", "Email", "Phone", "Address"].map((label, i) => (
            <div key={i}>
              <label className="text-gray-600 dark:text-gray-300">{label}</label>
              <input className="mt-2 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white" defaultValue="" />
            </div>
          ))}
        </div>

        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700">
          Save Changes
        </button>
      </section>

      <Card className="w-full h-full p-3 mt-8">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">Informasi Admin</h4>
          <p className="mt-2 px-2 text-base text-gray-600">
            Ringkasan informasi utama akun admin, termasuk detail kontak dan status pekerjaan.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 px-2">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-shadow-500 dark:!bg-navy-700">
            <p className="text-sm text-gray-600">Nama Lengkap</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">{profileData.firstName} {profileData.lastName}</p>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white px-3 py-4 shadow-shadow-500 dark:!bg-navy-700">
            <p className="text-sm text-gray-600">Jabatan</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">Admin</p>
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-shadow-500 dark:!bg-navy-700">
            <p className="text-sm text-gray-600">Departemen</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">Operasional</p>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700">
            <p className="text-sm text-gray-600">Lokasi Kerja</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">Kantor Pusat</p>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white mt-6 px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">{profileData.email}</p>
        </div>
      </Card>
    </>
  );
}
