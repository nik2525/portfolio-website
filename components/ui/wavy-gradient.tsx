"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface WavyGradientProps {
  className?: string
  containerClassName?: string
  colors?: string[]
  speed?: number
  amplitude?: number
  frequency?: number
}

export function WavyGradient({
  className,
  containerClassName,
  colors = ["#0ea5e9", "#8b5cf6", "#ec4899"],
  speed = 0.5,
  amplitude = 50,
  frequency = 0.001,
}: WavyGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 200 // Fixed height for the wave
    }

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color)
      })
      return gradient
    }

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      ctx.fillStyle = createGradient()

      // Draw wave
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * frequency + time) * amplitude + canvas.height / 2
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()

      // Update time for animation
      time += speed / 100

      animationId = requestAnimationFrame(drawWave)
    }

    resizeCanvas()
    drawWave()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [colors, speed, amplitude, frequency])

  return (
    <div className={cn("relative w-full overflow-hidden", containerClassName)}>
      <div className={cn("relative z-10", className)}>{/* Content goes here */}</div>
      <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full pointer-events-none" />
    </div>
  )
}
