"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface StarBackgroundProps {
  className?: string
  starDensity?: number
  allStarsTwinkle?: boolean
  twinkleProbability?: number
  minTwinkleSpeed?: number
  maxTwinkleSpeed?: number
}

export function StarBackground({
  className,
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
}: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const stars: Array<{
      x: number
      y: number
      radius: number
      opacity: number
      twinkleSpeed: number
      twinkleDirection: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const numStars = Math.floor(canvas.width * canvas.height * starDensity)
      stars.length = 0

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) + minTwinkleSpeed,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        if (allStarsTwinkle || Math.random() < twinkleProbability) {
          star.opacity += star.twinkleDirection * star.twinkleSpeed * 0.01
          if (star.opacity <= 0 || star.opacity >= 1) {
            star.twinkleDirection *= -1
          }
          star.opacity = Math.max(0, Math.min(1, star.opacity))
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createStars()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} />
}
