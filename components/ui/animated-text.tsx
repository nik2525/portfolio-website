"use client"

import { useState } from "react"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
}

export function AnimatedText({ text, className, once = true }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef as React.RefObject<Element>, { once })

  return (
    <div ref={textRef} className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "translate-y-[100%] opacity-0 transition-all duration-1000",
          isInView && "translate-y-0 opacity-100",
        )}
      >
        {text}
      </div>
    </div>
  )
}

// Simple InView hook
function useInView(ref: React.RefObject<Element>, options = { once: true }) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const element = ref.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [ref, options.once])

  return isIntersecting
}
