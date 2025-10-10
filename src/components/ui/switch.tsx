'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [isChecked, setIsChecked] = React.useState(props.checked || props.defaultChecked || false)

  React.useEffect(() => {
    if (props.checked !== undefined) {
      setIsChecked(props.checked)
    }
  }, [props.checked])

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked)
    props.onCheckedChange?.(checked)
  }

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-[1.8rem] w-[3.6rem] shrink-0 items-center rounded-full border-0 shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
      onCheckedChange={handleCheckedChange}
      style={{
        backgroundColor: isChecked ? 'var(--theme)' : 'var(--primitive-neutral-400)',
        ...props.style,
      }}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={
          'pointer-events-none block size-[1.4rem] rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-[calc(3.6rem-1.4rem-0.2rem)] data-[state=unchecked]:translate-x-[0.2rem]'
        }
        style={{ backgroundColor: 'var(--white)' }}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
