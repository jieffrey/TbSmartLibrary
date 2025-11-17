'use client'
import Link from "next/link"

interface CTAButtonProps {
  href?: string
  text: string
  variant?: "primary" | "outline"
  onClick?: () => void
}

export default function CTAButton({ href, text, variant = "primary", onClick }: CTAButtonProps) {
  const baseStyle =
    "px-8 py-3 font-semibold rounded-full transition duration-300 cursor-pointer border"

  const styles =
    variant === "primary"
      ? `
          bg-[var(--color-primary)] 
          text-black 
          border-transparent
          hover:bg-transparent 
          hover:text-[var(--color-primary)] 
          hover:border-[var(--color-primary)]
          dark:text-black 
          dark:hover:text-[var(--color-primary)]
        `
      : `
          bg-transparent 
          border-[var(--color-primary)] 
          text-[var(--color-primary)] 
          hover:bg-[var(--color-primary)] 
          hover:text-black
          dark:text-[var(--color-primary)]
        `

  const className = `${baseStyle} ${styles}`

  return href ? (
    <Link href={href} className={className}>
      {text}
    </Link>
  ) : (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}
