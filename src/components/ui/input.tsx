import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-8 w-full min-w-0 rounded-[4px] border bg-[var(--usage-form-default-bg)] px-3 py-2 text-sm text-[var(--body-text)] outline-none transition-colors",
        "border-[var(--usage-form-border)] placeholder:text-[var(--usage-form-placeholder)]",
        "focus-visible:border-[var(--usage-form-focus-border)] focus-visible:ring-[var(--usage-form-focus-border)]/25 focus-visible:ring-[3px]",
        "disabled:bg-[var(--usage-form-disabled-bg)] disabled:text-[var(--usage-form-placeholder)] disabled:cursor-not-allowed disabled:opacity-100",
        "aria-invalid:border-[var(--usage-form-error-border)] aria-invalid:bg-[var(--usage-form-error-bg)] aria-invalid:text-[var(--usage-form-error-text)] aria-invalid:focus-visible:ring-[var(--usage-form-focus-40)]",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
