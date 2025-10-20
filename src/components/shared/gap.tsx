import * as React from 'react'

import { cn } from '@/lib/utils'

type GapSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const gapMapping: Record<GapSize, string> = {
  '2xs': 'var(--primitive-spacing-spacing-4)',
  xs: 'var(--primitive-spacing-spacing-6)',
  sm: 'var(--primitive-spacing-spacing-8)',
  md: 'var(--primitive-spacing-spacing-16)',
  lg: 'var(--primitive-spacing-spacing-24)',
  xl: 'var(--primitive-spacing-spacing-32)',
  '2xl': 'var(--primitive-spacing-spacing-48)',
}

const rowGapMapping: Record<GapSize, string> = {
  '2xs': 'var(--primitive-spacing-spacing-4)',
  xs: 'var(--primitive-spacing-spacing-6)',
  sm: 'var(--primitive-spacing-spacing-8)',
  md: 'var(--primitive-spacing-spacing-16)',
  lg: 'var(--primitive-spacing-spacing-16)',
  xl: 'var(--primitive-spacing-spacing-24)',
  '2xl': 'var(--primitive-spacing-spacing-32)',
}

const columnGapMapping: Record<GapSize, string> = {
  '2xs': 'var(--primitive-spacing-spacing-4)',
  xs: 'var(--primitive-spacing-spacing-6)',
  sm: 'var(--primitive-spacing-spacing-8)',
  md: 'var(--primitive-spacing-spacing-16)',
  lg: 'var(--primitive-spacing-spacing-24)',
  xl: 'var(--primitive-spacing-spacing-32)',
  '2xl': 'var(--primitive-spacing-spacing-48)',
}

interface GapProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  gap?: GapSize
  row?: boolean
  wrap?: boolean
}

const Gap = React.forwardRef<HTMLElement, GapProps>(function Gap(
  {
    as: Component = 'div',
    gap = 'sm',
    row = false,
    wrap = false,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const computedStyle = React.useMemo<React.CSSProperties>(() => {
    const base: React.CSSProperties = {
      ...style,
    }

    delete base.gap

    if (row) {
      if (base.columnGap === undefined) {
        base.columnGap = wrap ? columnGapMapping[gap] : gapMapping[gap]
      }
      if (base.rowGap === undefined) {
        base.rowGap = wrap ? rowGapMapping[gap] : '0px'
      }
    } else {
      if (base.rowGap === undefined) {
        base.rowGap = gapMapping[gap]
      }
      if (base.columnGap === undefined) {
        base.columnGap = '0px'
      }
    }

    return base
  }, [gap, row, wrap, style])

  return (
    <Component
      ref={ref}
      className={cn(
        'flex',
        row ? 'flex-row' : 'flex-col',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        className,
      )}
      style={computedStyle}
      {...props}
    >
      {children}
    </Component>
  )
})

Gap.displayName = 'Gap'

export { Gap }

