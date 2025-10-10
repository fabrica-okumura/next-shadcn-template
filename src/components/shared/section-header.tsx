import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  icon?: ReactNode
  title: ReactNode
  action?: ReactNode
  className?: string
  titleClassName?: string
}

export function SectionHeader({ icon, title, action, className, titleClassName }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className={cn("flex items-center gap-2 text-lg font-semibold", titleClassName)}>
        {icon}
        {title}
      </div>
      {action}
    </div>
  )
}

