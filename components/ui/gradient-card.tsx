"use client"

import type React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  gradientColors?: string[]
}

export function GradientCard({
  children,
  className,
  containerClassName,
  gradientColors = ["#3b82f6", "#8b5cf6", "#ec4899"],
}: GradientCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative group", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient border */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl p-[2px] transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-60",
        )}
        style={{
          background: `linear-gradient(135deg, ${gradientColors.join(", ")})`,
        }}
      >
        <div className="w-full h-full rounded-2xl bg-black dark:bg-gray-900" />
      </div>

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl transition-opacity duration-300 blur-xl",
          isHovered ? "opacity-30" : "opacity-0",
        )}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColors[0]}40, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className={cn("relative z-10 rounded-2xl overflow-hidden", className)}>{children}</div>
    </div>
  )
}
