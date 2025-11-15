"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Card className="p-6 rounded-2xl border-none shadow-lg hover:shadow-xl dark:bg-gray-800 transition duration-300 hover:-translate-y-2">
        <CardHeader>
          <div className="flex justify-center mb-4">{icon}</div>
          <CardTitle className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {desc}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
