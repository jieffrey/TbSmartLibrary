"use client";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="
      relative py-24 
      bg-gradient-to-br from-blue-50 to-white
      dark:from-gray-900 dark:via-gray-950 dark:to-black
    ">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Mari Terhubung 📚
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Punya pertanyaan seputar Smart Eduverse? Hubungi kami melalui form
            atau kontak di bawah ini.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <MapPin className="text-[var(--color-primary)]" /> Bandung, Indonesia
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Phone className="text-[var(--color-primary)]" /> +62 878 3961 5005
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Mail className="text-[var(--color-primary)]" /> support@smarteduverse.com
            </div>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
