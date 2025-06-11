"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BackgroundGradientProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  interactive?: boolean
}

export function BackgroundGradient({
  children,
  className,
  containerClassName,
  animate = true,
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  interactive = true,
}: BackgroundGradientProps) {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveRef.current) return

      const rect = interactiveRef.current.getBoundingClientRect()
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const element = interactiveRef.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
      return () => element.removeEventListener("mousemove", handleMouseMove)
    }
  }, [interactive])

  return (
    <div className={cn("relative p-[4px] group", containerClassName)} ref={interactiveRef}>
      <div
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          animate && "animate-tilt",
        )}
        style={{
          backgroundImage: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgb(${pointerColor}), transparent 40%),
            linear-gradient(0deg, rgb(${firstColor}), rgb(${secondColor})),
            linear-gradient(90deg, rgb(${thirdColor}), rgb(${fourthColor})),
            linear-gradient(180deg, rgb(${fifthColor}), rgb(${firstColor}))`,
          backgroundSize: size,
          backgroundPosition: "0% 0%, 0% 0%, 0% 0%, 0% 0%",
          backgroundBlendMode: blendingValue,
        }}
      />
      <div
        className={cn("absolute inset-0 rounded-3xl z-[1] will-change-transform", animate && "animate-tilt")}
        style={{
          backgroundImage: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgb(${pointerColor}), transparent 40%),
            linear-gradient(0deg, rgb(${firstColor}), rgb(${secondColor})),
            linear-gradient(90deg, rgb(${thirdColor}), rgb(${fourthColor})),
            linear-gradient(180deg, rgb(${fifthColor}), rgb(${firstColor}))`,
          backgroundSize: size,
          backgroundPosition: "0% 0%, 0% 0%, 0% 0%, 0% 0%",
          backgroundBlendMode: blendingValue,
        }}
      />

      <div className={cn("relative z-10", className)}>{children}</div>

      <style jsx>{`
        @keyframes tilt {
          0%,
          50%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }

        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  )
}
