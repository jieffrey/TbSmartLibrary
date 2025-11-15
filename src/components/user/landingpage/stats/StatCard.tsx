"use client";
import { motion } from "framer-motion";

export default function StatCard({ icon, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition-all duration-300 border border-white/30"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        {value}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </motion.div>
  );
}
