import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-button",
    "text-center",
    "font-semibold",
    "transition-all",
    "duration-default",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-primary-600",
          "text-white",
          "border",
          "border-primary-600",
          "hover:enabled:bg-primary-700",
          "hover:enabled:border-primary-700",
          "shadow-sm",
          "hover:shadow-md"
        ],
        secondary: [
          "bg-transparent",
          "text-primary-600",
          "dark:text-primary-400",
          "border",
          "border-primary-600",
          "dark:border-primary-400",
          "hover:enabled:bg-primary-600",
          "hover:enabled:text-white",
          "dark:hover:enabled:bg-primary-500"
        ],
        accent: [
          "bg-accent-400",
          "text-white",
          "border",
          "border-accent-400",
          "hover:enabled:bg-accent-500",
          "hover:enabled:border-accent-500",
          "shadow-sm",
          "hover:shadow-md"
        ],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-2", "px-4"],
        md: ["min-w-28", "h-full", "min-h-11", "text-base", "py-2.5", "px-5"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-base", "py-3", "px-6"],
      },
      fullWidth: {
        true: ["w-full"],
        false: []
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
      fullWidth: false,
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  href: string
  fullWidth?: boolean
}

export function Button({ className, intent, size, fullWidth, ...props }: ButtonProps) {
  return (
    <a className={twMerge(button({ intent, size, fullWidth, className }))} {...props}>
      {props.children}
    </a>
  )
}
