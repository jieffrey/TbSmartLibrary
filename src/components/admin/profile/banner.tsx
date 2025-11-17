"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

// ❌ Supabase di-nonaktifkan sementara (di-comment)
// import { useEffect } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export default function ProfileBanner() {
  // Dummy state (sementara)
  const [userName] = useState("User Name");
  const [userDesc] = useState("Admin");

  // ❌ Fetch user dari Supabase di-comment
  /*
  useEffect(() => {
    async function getUserName() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setUserName("Guest");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", userId)
        .single();

      if (error) {
        setUserName("User Not Found");
      } else if (data) {
        setUserName(`${data.first_name} ${data.last_name}`);
      }
    }

    getUserName();
  }, []);
  */

  return (
    <Card className={"items-center w-full h-full p-[16px] bg-cover rounded-3xl shadow"}>
      {/* Banner Background */}
      <div
        className="relative mt-1 flex h-40 w-full justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-blue-700 overflow-hidden shadow"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-[url('/images/hero/bgHero.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Avatar */}
        <div className="absolute -bottom-12 flex h-[90px] w-[90px] items-center justify-center rounded-full border-[4px] border-white bg-white/20 backdrop-blur-md">
          <User size={42} className="text-white" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {userName}
        </h4>
        <h5 className="text-base font-normal text-gray-600 dark:text-gray-300">
          {userDesc}
        </h5>
      </div>

      {/* Description */}
      <div className="mb-3 mt-6 flex gap-4 md:gap-14 px-4">
        <p className="text-center text-sm font-normal text-gray-600 dark:text-gray-300">
          Memimpin dan mengelola proses operasional harian agar berjalan
          efisien. Bertanggung jawab memastikan seluruh sumber daya dan alur
          kerja berfungsi optimal.
        </p>
      </div>
    </Card>
  );
}
