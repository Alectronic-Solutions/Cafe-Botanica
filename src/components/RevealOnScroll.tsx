'use client'

import { useEffect, useRef } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  /** Rendered element - use 'li' when revealing list items so the list stays valid. */
  as?: 'div' | 'li'
  className?: string
  stagger?: boolean
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'fade' | 'scale'
  distance?: number
  threshold?: number
}

export default function RevealOnScroll({
  children,
  as: Tag = 'div',
  className = '',
  stagger = false,
  delay,
  direction = 'up',
  distance = 28,
  threshold = 0.12,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      // Reveal once the element's top has risen `threshold` of the way up the
      // viewport. An area ratio would never fire for blocks much taller than
      // the screen (a phone-height gallery needs 600px on screen at 0.12).
      { threshold: 0, rootMargin: `0px 0px -${Math.round(threshold * 100)}% 0px` }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const dirClass = stagger ? 'reveal-stagger' : `reveal reveal--${direction}`

  const style: React.CSSProperties & Record<string, string> = {}
  if (delay !== undefined) style.transitionDelay = `${delay}ms`
  if (!stagger && direction !== 'fade' && direction !== 'scale') {
    if (direction === 'up') style['--reveal-y'] = `${distance}px`
    if (direction === 'left') style['--reveal-x'] = `${-distance}px`
    if (direction === 'right') style['--reveal-x'] = `${distance}px`
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement>}
      className={`${dirClass} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
