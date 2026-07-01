'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type ProductGridRevealProps = {
  children: ReactNode
  className?: string
}

export default function ProductGridReveal({ children, className }: ProductGridRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>(ref.current ? Array.from(ref.current.children) : [])
      gsap.set(cards, { opacity: 0, y: 32 })
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', overwrite: true }),
        onEnterBack: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', overwrite: true }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { opacity: 0, y: 32, duration: 0.4, overwrite: true }),
      })
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
