"use client";
import Link from "next/link";

export default function Button({ href, text, variant = "primary" }) {
  const baseStyle =
    "px-8 py-4 rounded-full font-semibold text-base transition-all duration-300";

  const styles = {
    primary:
      baseStyle +
      " bg-[var(--color-primary)] text-black hover:bg-transparent hover:text-[var(--color-primary)] border border-[var(--color-primary)]",
    outline:
      baseStyle +
      " bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black",
  };

  return (
    <Link href={href} className={styles[variant]}>
      {text}
    </Link>
  );
}
