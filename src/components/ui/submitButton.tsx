"use client";
import { motion } from "framer-motion";

export default function SubmitButton({ text }: { text: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
    >
      {text}
    </motion.button>
  );
}
