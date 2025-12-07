"use client";

import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type BookCoverProps = {
  imageUrl?: string;
  title: string;
  className?: string;
};

export default function BookCover({ imageUrl, title, className }: BookCoverProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`w-full h-full ${className || ""} relative`}>
      {(!imageUrl || imageError) && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600" />
        </div>
      )}
      {imageUrl && !imageError && (
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
