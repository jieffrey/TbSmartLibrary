"use client"
import { motion } from "framer-motion";

export function GreetingCard() {
return (
<motion.div
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
className="bg-[#D2E3C8] dark:bg-[#294B29] p-5 rounded-2xl mb-6 shadow-md"
>
<h2 className="text-xl font-semibold text-[#294B29] dark:text-white">
Selamat datang kembali 
</h2>
<p className="text-gray-700 dark:text-gray-200">
Mau baca buku apa hari ini?
</p>
</motion.div>
);
}