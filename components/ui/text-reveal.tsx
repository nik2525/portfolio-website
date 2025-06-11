"use client"

import { useEffect } from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  text: string
  className?: string
  revealClassName?: string
  delay?: number
}

export function TextReveal({ text, className, revealClassName, delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsRevealed(true)
          }, delay)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [delay])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "transform transition-transform duration-1000 ease-in-out",
          isRevealed ? "translate-y-0" : "translate-y-full",
          revealClassName,
        )}
      >
        {text}
      </div>
    </div>
  )
}
