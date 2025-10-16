import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

interface FilterChipsProps<T extends string> {
  items: T[]
  value: T
  onChange: (value: T) => void
  className?: string
  getCount?: (value: T) => number
  chipClassName?: string
}

export function FilterChips<T extends string>({ items, value, onChange, className, getCount, chipClassName }: FilterChipsProps<T>) {
  return (
    <div className={cn("flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-4", className)}>
      {items.map((item) => {
        const count = getCount?.(item)
        const isActive = value === item
        return (
          <Button
            key={item}
            variant={isActive ? "primary" : "neutral"}
            size="sm"
            onClick={() => onChange(item)}
            className={cn("h-9 min-w-[48px]", chipClassName)}
          >
            {item}
            {count !== undefined && (
              <span className="ml-2 rounded bg-background/50 px-1.5 py-0.5 text-xs">{count}</span>
            )}
          </Button>
        )
      })}
    </div>
  )
}

