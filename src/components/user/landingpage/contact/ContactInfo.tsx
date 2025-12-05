"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactCard from "./ContactCard";

export default function ContactInfo() {
  const items = [
    { icon: <MapPin size={22} />, text: "Depok, Indonesia" },
    { icon: <Phone size={22} />, text: "+62 878 3961 5005" },
    { icon: <Mail size={22} />, text: "support@TbSmartLibrary.com" },
  ];

  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          <ContactCard icon={item.icon} text={item.text} />
        </motion.div>
      ))}
    </div>
  );
}
