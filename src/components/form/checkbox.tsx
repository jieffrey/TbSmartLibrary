"use client";
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
    />
  );
}
