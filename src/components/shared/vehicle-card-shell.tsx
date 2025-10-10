import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface VehicleCardShellProps {
  media: ReactNode
  badge?: ReactNode
  favorite?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  mediaWrapperClassName?: string
  badgeWrapperClassName?: string
  favoriteWrapperClassName?: string
}

export function VehicleCardShell({
  media,
  badge,
  favorite,
  children,
  className,
  bodyClassName,
  mediaWrapperClassName,
  badgeWrapperClassName,
  favoriteWrapperClassName,
}: VehicleCardShellProps) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}>
      <div className={cn("relative w-full", mediaWrapperClassName)}>
        {media}
        {badge ? <div className={cn("absolute left-2 top-2", badgeWrapperClassName)}>{badge}</div> : null}
        {favorite ? <div className={cn("absolute right-2 top-2", favoriteWrapperClassName)}>{favorite}</div> : null}
      </div>
      <div className={cn("flex flex-1 flex-col gap-4 px-6 pb-6 pt-4", bodyClassName)}>{children}</div>
    </div>
  )
}

