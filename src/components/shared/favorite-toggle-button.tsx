import type { ButtonHTMLAttributes, MouseEventHandler } from "react"
import { useState } from "react"

import { Icons } from "@/components/ui/icon"

import { cn } from "@/lib/utils"

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

type ButtonPropsWithoutOnClick = Omit<NativeButtonProps, "onClick">

interface FavoriteToggleButtonProps extends ButtonPropsWithoutOnClick {
  active?: boolean
  defaultActive?: boolean
  onValueChange?: (next: boolean) => void
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function FavoriteToggleButton({ active, defaultActive = false, onValueChange, className, ...props }: FavoriteToggleButtonProps) {
  const [internalActive, setInternalActive] = useState(defaultActive)
  const isControlled = active !== undefined
  const currentActive = isControlled ? active : internalActive

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isControlled) {
      setInternalActive((prev) => !prev)
      onValueChange?.(!internalActive)
    } else {
      onValueChange?.(!currentActive)
    }

    props.onClick?.(event)
  }

  return (
    <button
      type="button"
      aria-label={currentActive ? "お気に入り解除" : "お気に入り"}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-white shadow transition-colors",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <Icons.Star
        className={cn(
          "size-4",
          currentActive
            ? "fill-[var(--usage-button-primary)] text-[var(--usage-button-primary)]"
            : "text-[var(--usage-button-primary)]",
        )}
      />
    </button>
  )
}

