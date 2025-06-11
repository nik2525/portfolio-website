"use client"

import type React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  duration?: number
  borderWidth?: number
  borderColor?: string
  borderRadius?: string
  as?: React.ElementType
}

export function AnimatedBorder({
  children,
  className,
  containerClassName,
  duration = 2.5,
  borderWidth = 1,
  borderColor = "rgba(255, 255, 255, 0.3)",
  borderRadius = "0.5rem",
  as: Component = "div",
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative rounded-[inherit]", containerClassName)}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          borderRadius,
          padding: borderWidth,
          backgroundImage: `linear-gradient(90deg, ${borderColor}, transparent 25%, transparent 75%, ${borderColor}), 
                           linear-gradient(0deg, ${borderColor}, transparent 25%, transparent 75%, ${borderColor})`,
          backgroundSize: "400% 100%, 100% 400%",
          backgroundPositionX: `${position.x / 5}%`,
          backgroundPositionY: `${position.y / 5}%`,
          opacity,
          transition: `opacity 0.3s ease, background-position ${duration}s ease`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
      <Component className={cn("relative z-10", className)}>{children}</Component>
    </div>
  )
}
