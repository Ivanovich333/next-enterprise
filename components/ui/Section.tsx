import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: "white" | "gray" | "gradient"
  noPadding?: boolean
}

export function Section({ children, className = "", variant = "white", noPadding = false }: SectionProps) {
  const variantClasses = {
    white: "bg-white dark:bg-gray-900",
    gray: "bg-gray-50 dark:bg-gray-950",
    gradient: "bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800",
  }

  const paddingClass = noPadding ? "" : "py-section lg:py-section-lg"

  return (
    <section className={twMerge(variantClasses[variant], paddingClass, className)}>
      {children}
    </section>
  )
}
