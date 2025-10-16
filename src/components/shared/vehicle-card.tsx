import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { FavoriteToggleButton } from "./favorite-toggle-button"
import { VehicleCardShell } from "./vehicle-card-shell"
import { VehicleMediaPlaceholder } from "./vehicle-media-placeholder"

export interface VehicleCardProps {
  maker: string
  model: string
  media?: ReactNode
  badge?: ReactNode
  favorite?: {
    active?: boolean
    onToggle?: () => void
  }
  header: ReactNode
  priceSection?: ReactNode
  specs?: ReactNode
  footer?: ReactNode
  className?: string
  bodyClassName?: string
  mediaClassName?: string
}

export function VehicleCard({
  maker,
  model,
  media,
  badge,
  favorite,
  header,
  priceSection,
  specs,
  footer,
  className,
  bodyClassName,
  mediaClassName,
}: VehicleCardProps) {
  const mediaContent = media ?? <VehicleMediaPlaceholder maker={maker} model={model} className="absolute inset-0" />

  return (
    <VehicleCardShell
      media={<div className={cn("w-full pt-[75%]", mediaClassName)}>{mediaContent}</div>}
      badge={badge}
      favorite={
        favorite ? (
          <FavoriteToggleButton
            active={favorite.active}
            defaultActive={favorite.active}
            onValueChange={favorite.onToggle}
          />
        ) : undefined
      }
      className={className}
      bodyClassName={bodyClassName}
    >
      <div className="space-y-2">
        {header}
        {priceSection}
      </div>
      {specs}
      {footer}
    </VehicleCardShell>
  )
}

