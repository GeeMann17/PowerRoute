import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 border-2 border-border",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground brutal-shadow brutal-hover",
        destructive:
          "bg-destructive text-white brutal-shadow brutal-hover",
        outline:
          "bg-background text-foreground border-2 border-border brutal-shadow-sm brutal-hover",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-border brutal-shadow-sm brutal-hover",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground",
        link:
          "text-foreground underline-offset-4 hover:underline border-transparent",
        accent:
          "bg-accent text-accent-foreground border-2 border-border brutal-shadow brutal-hover font-black",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 gap-1.5 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
