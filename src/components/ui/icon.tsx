import React, { forwardRef, useId, useMemo } from 'react'

import { iconDefinitions, IconName } from './icon-definitions'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]|'/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case "'":
        return '&#39;'
      default:
        return char
    }
  })
}

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName
  size?: number
  alt?: string
  title?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    name,
    size = 24,
    className,
    alt,
    title,
    role,
    width,
    height,
    ...rest
  },
  ref,
) {
  const definition = iconDefinitions[name]

  const reactId = useId()
  const uniqueSuffix = useMemo(() => reactId.replace(/:/g, '-'), [reactId])

  const innerHtml = useMemo(() => {
    if (!definition) {
      return ''
    }

    let content = definition.content

    for (const originalId of definition.ids) {
      const escapedId = escapeRegExp(originalId)
      const newId = `${originalId}-${uniqueSuffix}`
      content = content
        .replace(new RegExp(`id="${escapedId}"`, 'g'), `id="${newId}"`)
        .replace(new RegExp(`url\\(#${escapedId}\\)`, 'g'), `url(#${newId})`)
        .replace(new RegExp(`href="#${escapedId}"`, 'g'), `href="#${newId}"`)
        .replace(
          new RegExp(`xlink:href="#${escapedId}"`, 'g'),
          `xlink:href="#${newId}"`,
        )
    }

    if (title) {
      content = `<title>${escapeHtml(title)}</title>${content}`
    }

    return content
  }, [definition, title, uniqueSuffix])

  if (!definition) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon]: icon "${name}" is not defined.`)
    }
    return null
  }

  const computedRole = role ?? (alt ? 'img' : undefined)
  const accessibilityProps = alt
    ? { role: computedRole, 'aria-label': alt }
    : { role: computedRole, 'aria-hidden': true }

  const svgWidth = width ?? size
  const svgHeight = height ?? size

  return (
    <svg
      ref={ref}
      className={className}
      width={svgWidth}
      height={svgHeight}
      viewBox={definition.viewBox}
      focusable="false"
      {...accessibilityProps}
      {...rest}
      dangerouslySetInnerHTML={{ __html: innerHtml }}
    />
  )
})

Icon.displayName = 'Icon'
