"use client";
import React from "react";

export default function Labelform({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-1 text-sm font-medium text-gray-200">
      {children}
    </label>
  );
}
