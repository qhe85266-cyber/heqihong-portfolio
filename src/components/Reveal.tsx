import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
}

/** 轻量淡入。减少动态模式下由 CSS 直接显示内容。 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: Props) {
  const { ref, visible } = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
