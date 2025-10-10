import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-[var(--primitive-spacing-spacing-40)] w-full min-w-0 rounded-[var(--usage-form)] border bg-[var(--usage-form-default-bg)] px-[var(--primitive-spacing-spacing-12)] py-[var(--primitive-spacing-spacing-12)] text-[length:var(--font-size-usage-default)] text-[color:var(--body-text)] shadow-none outline-none transition-colors",
        "border-[var(--usage-form-border)] placeholder:text-[var(--usage-form-placeholder)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--usage-form-focus-border)] focus-visible:ring-offset-0",
        "disabled:bg-[var(--usage-form-disabled-bg)] disabled:text-[color:var(--usage-form-placeholder)] disabled:cursor-not-allowed disabled:opacity-100",
        "aria-invalid:border-[var(--usage-form-error-border)] aria-invalid:bg-[var(--usage-form-error-bg)] aria-invalid:text-[color:var(--usage-form-error-text)] aria-invalid:focus-visible:ring-[var(--usage-form-focus-40)]",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
