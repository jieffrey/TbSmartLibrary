'use client'
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import CTAButton from "./CTAbutton"

interface BookCardProps {
  id: number
  title: string
  category: string
  rating: number
  img: string
}

export default function BookCard({ id, title, category, rating, img }: BookCardProps) {
  return (
    <Card className="
      group backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-lg transition
      bg-white/80 dark:bg-white/5
      border border-gray-200 dark:border-white/10
    ">
      <div className="relative">
        <Image
          src={img}
          alt={title}
          width={400}
          height={500}
          className="object-cover w-full h-64 group-hover:scale-105 transition duration-300"
        />
        <div className="
          absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
          transition flex items-center justify-center
        ">
          <CTAButton
            href={'/full-width-pages/auth/signup'} ///catalog/${id} with data
            text="Pinjam Sekarang"
            variant="primary"
          />
        </div>
      </div>
      <CardContent className="p-4 text-left">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>

        <div className="flex items-center gap-1 mt-2 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{rating}</span>
        </div>
      </CardContent>
    </Card>
  );
}
