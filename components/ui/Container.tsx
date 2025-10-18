import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={twMerge("mx-auto max-w-(--breakpoint-xl) px-4 lg:px-6", className)}>
      {children}
    </div>
  )
}
