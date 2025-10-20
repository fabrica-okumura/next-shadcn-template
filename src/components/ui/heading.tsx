"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva("text-[var(--color-color-body-text)] font-semibold", {
  variants: {
    variant: {
      page_title: "text-[28px] leading-[1.25]",
      h1: "text-[24px] leading-[1.25]",
      h2: "text-[20px] leading-[1.3]",
      h3: "text-[18px] leading-[1.35]",
      h4: "text-[16px] leading-[1.4]",
      h5: "text-[14px] leading-[1.45]",
      h6: "text-[12px] leading-[1.5] uppercase tracking-wide",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
})

type HeadingVariant = VariantProps<typeof headingVariants>["variant"]

const tagMap: Record<NonNullable<HeadingVariant>, keyof JSX.IntrinsicElements> = {
  page_title: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
}

interface HeadingProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  ({ className, variant = "h2", asChild = false, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : tagMap[variant ?? "h2"]

    return (
      <Comp
        ref={ref}
        data-slot="heading"
        className={cn(headingVariants({ variant }), className)}
        {...props}
      />
    )
  },
)

Heading.displayName = "Heading"

export { Heading, headingVariants }

