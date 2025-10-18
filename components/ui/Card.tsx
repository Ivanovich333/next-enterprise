import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: "default" | "lg"
}

export function Card({ children, className = "", hover = true, padding = "default" }: CardProps) {
  const paddingClass = padding === "lg" ? "p-card-lg" : "p-card"
  const hoverClass = hover ? "hover:shadow-card-hover transition-shadow duration-default" : ""

  return (
    <div className={twMerge(
      "bg-white dark:bg-gray-800 rounded-card border border-gray-200 dark:border-gray-700 shadow-card",
      paddingClass,
      hoverClass,
      className
    )}>
      {children}
    </div>
  )
}
