"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // ← Import client

export default function SignInForm() {
  const router = useRouter();
  const supabase = createClient(); // ← Create supabase instance
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. LOGIN KE SUPABASE AUTH
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log("✅ LOGIN DATA:", authData);
      console.log("❌ LOGIN ERROR:", authError);

      if (authError) {
        // Translate error messages ke Bahasa Indonesia
        const errorMessages: Record<string, string> = {
          "Invalid login credentials": "Email atau password salah",
          "Email not confirmed": "Email belum dikonfirmasi",
          "User not found": "Akun tidak ditemukan",
        };

        setError(errorMessages[authError.message] || authError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        // 2. AMBIL PROFILE DARI TABLE PROFILES
        // PENTING: Pakai 'profiles' bukan 'users'
        // PENTING: Field id LANGSUNG match dengan auth.users.id (UUID)
        const { data: profile, error: profileError } = await supabase
          .from("profiles") // ← Table profiles (bukan users!)
          .select("id, nama, kelas, email, role")
          .eq("id", authData.user.id) // ← Match langsung dengan user.id (UUID)
          .single();

        console.log("PROFILE DATA:", profile);
        console.log("PROFILE ERROR:", profileError);

        if (profileError || !profile) {
          setError("Data user tidak ditemukan. Silakan hubungi admin.");
          setLoading(false);
          
          // Logout jika profile tidak ada
          await supabase.auth.signOut();
          return;
        }

        const role = profile.role;
        console.log("🔍 ROLE:", role);

        // 3. REDIRECT BERDASARKAN ROLE
        if (role === "admin") {
          console.log("➡️ Redirect ke /admin");
          router.push("/admin");
          router.refresh(); // Refresh untuk update auth state
        } else if (role === "user") {
          console.log("➡️ Redirect ke /user");
          router.push("/user");
          router.refresh();
        } else {
          setError("Role tidak dikenali: " + role);
          setLoading(false);
        }
      }
    } catch (err) {
      console.error("💥 UNEXPECTED ERROR:", err);
      setError("Terjadi kesalahan tidak terduga");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        w-full max-w-md 
        bg-[#FFF8E7]/90 
        dark:bg-white/[0.03]
        backdrop-blur-md 
        shadow-xl 
        p-8 
        rounded-2xl 
        border border-[#005B96]/20 
        dark:border-white/10
      "
    >
      <h1 className="text-3xl font-bold text-center text-[#FFC248] mb-2">
        Masuk
      </h1>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
        Lanjutkan akses ke TbSmartLibrary
      </p>

      {/* ERROR MESSAGE */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        {/* EMAIL */}
        <div>
          <label className="text-gray-800 dark:text-gray-300 text-sm font-medium">
            Email Sekolah
          </label>
          <Input
            type="email"
            placeholder="email@sekolah.com"
            required
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-gray-800 dark:text-gray-300 text-sm font-medium">
            Password
          </label>

          <div className="relative mt-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 transition"
              disabled={loading}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>

        {/* BUTTON LOGIN */}
        <Button
          type="submit"
          disabled={loading}
          className="
            w-full 
            bg-[#FFC248] 
            hover:bg-[#FFB020] 
            text-white 
            hover:text-white
            border 
            border-[#FFC248]
            mt-4 
            disabled:opacity-50 
            disabled:cursor-not-allowed
            transition-all
            duration-200
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memuat...
            </span>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>

      {/* FOOTER INFO */}
      <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-6">
        Belum punya akun? Hubungi admin sekolah
      </p>
    </motion.div>
  );
}