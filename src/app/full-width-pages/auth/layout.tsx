"use client";

import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="w-full h-screen flex bg-[#FFF8E7] dark:bg-white/[0.03] overflow-hidden relative">

        {/* LEFT ILLUSTRATION */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-10 relative bg-[#FFF2D9]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center max-w-md relative z-10"
          >
            <img
              src="/Learning-rafiki.svg"
              alt="Library Illustration"
              className="w-72 drop-shadow-xl"
            />

            <h2 className="text-3xl font-bold text-[#FFC248] mt-6 leading-snug">
              Selamat Datang di TbSmartLibrary
            </h2>

            <p className="text-gray-800 dark:text-gray-800 mt-2 leading-relaxed">
              <Balancer>
                Akses koleksi buku digital, pantau peminjaman, dan temukan
                pengetahuan tanpa batas.
              </Balancer>
            </p>
          </motion.div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          {children}
        </div>

        {/* Theme Toggle */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeTogglerTwo />
        </div>
      </div>
    </ThemeProvider>
  );
}
