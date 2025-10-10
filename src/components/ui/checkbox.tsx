'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer size-[var(--primitive-spacing-spacing-16)] shrink-0 rounded-[var(--primitive-radius-radius-4)] border border-[var(--usage-form-border)] bg-white transition-shadow outline-none shadow-0',
        'focus-visible:border-[var(--usage-form-focus-border)] focus-visible:ring-[var(--usage-form-focus-0)] focus-visible:ring-offset-0',
        'data-[state=checked]:border-[var(--usage-button-primary)] data-[state=checked]:bg-[var(--usage-button-primary)] data-[state=checked]:text-white',
        'disabled:cursor-not-allowed disabled:bg-[var(--usage-form-disabled-bg)] disabled:text-[var(--usage-button-disabled)] disabled:border-[var(--usage-form-border)] disabled:opacity-100',
        'aria-invalid:border-[var(--usage-form-error-border)] aria-invalid:bg-[var(--usage-form-error-bg)]',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-white transition-none"
      >
        <CheckIcon className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
