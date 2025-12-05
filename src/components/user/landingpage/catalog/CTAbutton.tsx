"use client"
import Link from "next/link"

interface CTAButtonProps {
  href?: string
  text: string
  variant?: "primary" | "outline"
  onClick?: () => void
}

export default function CTAButton({ href, text, variant = "primary", onClick }: CTAButtonProps) {
  const baseStyle = `
    px-8 py-3 font-semibold rounded-full transition duration-300 cursor-pointer border
  `

  const styles =
    variant === "primary"
      ? `
        bg-[var(--color-primary)]
        text-[var(--color-dark)]
        border-transparent

        hover:bg-[color-mix(in srgb, var(--color-primary) 90%, #ffffff)]
        hover:border-[var(--color-foreground)]
        hover:text-[var(--color-dark)]

        dark:bg-white
        dark:text-black
      `
      : `
        bg-transparent
        border-[var(--color-foreground)]
        text-[var(--color-foreground)]

        hover:bg-[var(--color-foreground)]
        hover:text-black

        dark:border-[var(--color-foreground)]
        dark:text-[var(--color-foreground)]
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
