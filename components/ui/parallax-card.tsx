"use client"

import type React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  backgroundClassName?: string
  contentClassName?: string
}

export function ParallaxCard({ children, className, backgroundClassName, contentClassName }: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -5
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 5

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    setScale(1.05)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden transition-all duration-200", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={cn("absolute inset-0 z-0 transition-transform duration-200", backgroundClassName)}
        style={{
          transform: `translateZ(-20px) scale(1.2)`,
        }}
      />
      <div
        className={cn("relative z-10", contentClassName)}
        style={{
          transform: `translateZ(40px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  )
}
