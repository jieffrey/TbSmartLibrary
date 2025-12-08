"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ⭐ GANTI INI DENGAN ACCESS KEY KAMU DARI WEB3FORMS.COM
  const WEB3FORMS_ACCESS_KEY = "c195275d-bcd7-49bb-b21c-3a35a319426f";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Pesan Baru dari TB Smart Library", // Custom subject
          from_name: "TB Smart Library Contact Form", // Sender name
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        
        // Reset success message setelah 5 detik
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Terjadi kesalahan");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Gagal mengirim pesan. Coba lagi nanti.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#fff1c9] w-full">
      
      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">
        Hubungi Kami
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nama */}
        <div>
          <label htmlFor="name" className="text-sm text-[#1A1A1A] font-medium">
            Nama Lengkap
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={status === "loading"}
            className="mt-2 w-full p-3 rounded-lg bg-[#fff8e7] border border-[#ffe7b8] 
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC428]/40
              disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Masukkan nama kamu"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm text-[#1A1A1A] font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={status === "loading"}
            className="mt-2 w-full p-3 rounded-lg bg-[#fff8e7] border border-[#ffe7b8] 
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC428]/40
              disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Masukkan email kamu"
          />
        </div>

        {/* Pesan */}
        <div>
          <label htmlFor="message" className="text-sm text-[#1A1A1A] font-medium">
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            disabled={status === "loading"}
            className="mt-2 w-full p-3 rounded-lg bg-[#fff8e7] border border-[#ffe7b8] 
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC428]/40
              disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            placeholder="Tulis pesan kamu di sini…"
          />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
          >
            ✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            ❌ {errorMessage}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 mt-2 bg-[#1A1A1A] text-white rounded-lg font-semibold 
            hover:bg-[#FFC428] hover:text-[#1A1A1A] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Mengirim...
            </>
          ) : (
            "Kirim Pesan"
          )}
        </button>
      </form>
    </div>
  );
}