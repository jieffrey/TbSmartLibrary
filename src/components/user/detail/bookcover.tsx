"use client";
import Image from "next/image";

export default function BookCover({ src }: { src: string }) {
  return (
    <div className="w-full md:w-1/3 flex justify-center">
      <img
        src={src}
        width={300}
        height={420}
        alt="Book Cover"
        className="rounded-xl shadow-lg object-cover"
      />
    </div>
  );
}
