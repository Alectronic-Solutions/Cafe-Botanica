'use client'

import { useEffect, useRef } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  stagger?: boolean
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'fade' | 'scale'
  distance?: number
  threshold?: number
}

export default function RevealOnScroll({
  children,
  className = '',
  stagger = false,
  delay,
  direction = 'up',
  distance = 28,
  threshold = 0.12,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

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
      { threshold }
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
    <div ref={ref} className={`${dirClass} ${className}`} style={style}>
      {children}
    </div>
  )
}
