import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className = "" }: TypographyProps) {
  return (
    <h1 className={twMerge("text-hero md:text-hero-lg lg:text-hero-xl text-gray-900 dark:text-white", className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className = "" }: TypographyProps) {
  return (
    <h2 className={twMerge("text-section md:text-section-lg lg:text-section-xl text-gray-900 dark:text-white", className)}>
      {children}
    </h2>
  )
}

export function H3({ children, className = "" }: TypographyProps) {
  return (
    <h3 className={twMerge("text-subsection md:text-subsection-lg text-gray-900 dark:text-white", className)}>
      {children}
    </h3>
  )
}

export function H4({ children, className = "" }: TypographyProps) {
  return (
    <h4 className={twMerge("text-xl md:text-2xl font-semibold text-gray-900 dark:text-white", className)}>
      {children}
    </h4>
  )
}

export function Lead({ children, className = "" }: TypographyProps) {
  return (
    <p className={twMerge("text-lead lg:text-lead-lg text-gray-600 dark:text-gray-400", className)}>
      {children}
    </p>
  )
}

export function Body({ children, className = "" }: TypographyProps) {
  return (
    <p className={twMerge("text-base text-gray-600 dark:text-gray-300", className)}>
      {children}
    </p>
  )
}

export function Small({ children, className = "" }: TypographyProps) {
  return (
    <p className={twMerge("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  )
}
