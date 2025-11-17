"use client";

import React, { useState, useEffect } from "react";
// import { createClient } from "@supabase/supabase-js";
import { Card } from '@/components/ui/card';

// ------------------------------------------
// Supabase DI-COMMENT — nanti diganti MySQL
// ------------------------------------------
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ProfileGeneral() {
  // ------------------------------------------
  // State untuk data profile — nanti dari MySQL
  // ------------------------------------------
  const [profileData, setProfileData] = useState({
    // firstName: "Loading...",
    // lastName: "Loading...",
    // email: "Loading...",

    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    // ------------------------------------------
    // FETCH SUPABASE DI-COMMENT — akan diganti MySQL
    // ------------------------------------------
    /*
    async function getProfileData() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        console.error("User ID not found in local storage.");
        setProfileData({
          firstName: "Not Found",
          lastName: "",
          email: "Not Found",
        });
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, email")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        setProfileData({
          firstName: "Error",
          lastName: "fetching data",
          email: "Error",
        });
      } else if (data) {
        setProfileData({
          firstName: data.first_name || "N/A",
          lastName: data.last_name || "N/A",
          email: data.email || "N/A",
        });
      }
    }

    getProfileData();
    */
  }, []);

  return (
    <>
      {/* ======================== */}
      {/* BAGIAN FORM PERSONAL INFO */}
      {/* ======================== */}

      <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow mt-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Personal Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {["Full Name", "Email", "Phone", "Address"].map((label, i) => (
            <div key={i}>
              <label className="text-gray-600 dark:text-gray-300">{label}</label>

              <input
                className="mt-2 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white"

                // ------------------------------------------
                // defaultValue dummy di-comment  
                // nanti isi dari MySQL
                // ------------------------------------------
                // defaultValue={
                //   label === "Full Name"
                //     ? "John Doe"
                //     : label === "Email"
                //     ? "johndoe@email.com"
                //     : label === "Phone"
                //     ? "+62 812 3456 7890"
                //     : "Jakarta, Indonesia"
                // }

                defaultValue=""
              />
            </div>
          ))}
        </div>

        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700">
          Save Changes
        </button>
      </section>

      {/* ======================== */}
      {/* BAGIAN INFORMASI ADMIN    */}
      {/* ======================== */}

      <Card className={"w-full h-full p-3 mt-8"}>
        {/* Header */}
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Informasi Admin
          </h4>
          <p className="mt-2 px-2 text-base text-gray-600">
            Ringkasan informasi utama akun admin, termasuk detail kontak dan status pekerjaan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 px-2">
          {/* Nama */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Nama Lengkap</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {profileData.firstName} {profileData.lastName}
            </p>
          </div>

          {/* Jabatan */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Jabatan</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">Admin</p>
          </div>

          {/* Departemen */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Departemen</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">Operasional</p>
          </div>

          {/* Lokasi */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Lokasi Kerja</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">Kantor Pusat</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border mt-6 px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {profileData.email}
          </p>
        </div>
      </Card>
    </>
  );
}
