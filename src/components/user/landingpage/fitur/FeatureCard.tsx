"use client";
import { motion } from "framer-motion";

export default function FeatureCard({ icon, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="
        flex flex-col items-center justify-center 
        bg-white/90 dark:bg-white/5 
        backdrop-blur-md 
        rounded-2xl 
        shadow-md 
        p-8 
        border border-[var(--color-primary)]
        hover:-translate-y-2 
        hover:shadow-[0_0_20px_rgba(255,196,40,0.3)]
        transition-all duration-300
      "
    >
      <div className="mb-3">{icon}</div>

      <h3 className="text-4xl font-bold text-[var(--color-dark)] dark:text-white mb-2">
        {value}
      </h3>

      <p className="text-gray-700 dark:text-gray-300">{label}</p>
    </motion.div>
  );
}
