"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl p-8 rounded-2xl"
    >
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
        Selamat Datang 👋
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Masuk untuk melanjutkan ke Smart Eduverse Library
      </p>

      <form className="space-y-6">
        <div>
          <label className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            Email
          </label>
          <Input type="email" placeholder="contoh@email.com" className="mt-2" />
        </div>

        <div>
          <label className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            Password
          </label>
          <div className="relative mt-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? (
                <EyeOffIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <input type="checkbox" className="rounded accent-blue-500" />
            Ingat saya
          </label>
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Masuk
        </Button>

        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
