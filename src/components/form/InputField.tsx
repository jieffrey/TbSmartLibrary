"use client";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all`}
    />
  );
}
