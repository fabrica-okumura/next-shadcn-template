"use client"

import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground my-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {item.onClick ? (
            <button onClick={item.onClick} className="hover:text-foreground transition-colors">
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 1 ? "text-foreground font-medium" : ""}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
