"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import BackgroundEffects from "./BackgroundEffects";

export default function ContactSection() {
  return (
    <section className="relative py-32 overflow-hidden">

      <BackgroundEffects />

      <div className="container relative mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-7"
        >
          <h2 className="text-5xl font-extrabold text-[#1A1A1A] dark:text-white leading-tight drop-shadow-xl">
            Mari Terhubung dengan
            <br />
            <span className="text-[#FFC428]">
              TB Smart Library
            </span>
          </h2>

          <p className="text-gray-700 dark:text-gray-400 text-lg max-w-md">
            Punya pertanyaan atau butuh bantuan?  
            Kami siap membantu kapan saja.
          </p>

          <ContactInfo />
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* GOLD BORDER GLOW */}
          <div className="absolute inset-0 rounded-3xl 
            bg-gradient-to-br from-[#FFC428] via-[#FFD86A] to-[#FFB300]
            p-[2px] -z-10 blur-[3px]" 
          />

          <div className="rounded-3xl bg-white/70 dark:bg-[#1A1A1A]/50 
            backdrop-blur-2xl shadow-xl p-1">
            <ContactForm />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
