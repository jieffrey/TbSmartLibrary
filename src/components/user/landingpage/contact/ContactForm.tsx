"use client";

export default function ContactForm() {
  return (
    <div className="
      bg-white 
      rounded-2xl 
      p-8 
      shadow-[0_4px_20px_rgba(0,0,0,0.06)]
      border border-[#fff1c9]
      w-full
    ">
      
      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">
        Hubungi Kami
      </h3>

      {/* input group */}
      <div className="space-y-5">

        <div>
          <label className="text-sm text-[#1A1A1A] font-medium">
            Nama Lengkap
          </label>
          <input
            className="
              mt-2 w-full p-3 rounded-lg 
              bg-[#fff8e7] 
              border border-[#ffe7b8] 
              placeholder:text-gray-400 
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#FFC428]/40
            "
            placeholder="Masukkan nama kamu"
          />
        </div>

        <div>
          <label className="text-sm text-[#1A1A1A] font-medium">
            Email
          </label>
          <input
            className="
              mt-2 w-full p-3 rounded-lg 
              bg-[#fff8e7] 
              border border-[#ffe7b8] 
              placeholder:text-gray-400 
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#FFC428]/40
            "
            placeholder="Masukkan email kamu"
          />
        </div>

        <div>
          <label className="text-sm text-[#1A1A1A] font-medium">
            Pesan
          </label>
          <textarea
            rows={4}
            className="
              mt-2 w-full p-3 rounded-lg 
              bg-[#fff8e7] 
              border border-[#ffe7b8] 
              placeholder:text-gray-400 
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#FFC428]/40
            "
            placeholder="Tulis pesan kamu di sini…"
          ></textarea>
        </div>

        <button
          className="
            w-full py-3 mt-2 
            bg-[#1A1A1A] 
            text-white 
            rounded-lg 
            font-semibold 
            hover:bg-[#FFC428] 
            hover:text-[#1A1A1A]
            transition-all duration-200
          "
        >
          Kirim Pesan
        </button>
      </div>
    </div>
  );
}
