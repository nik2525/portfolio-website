"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface WavyBackgroundProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  direction?: "up" | "down"
}

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors = ["#fff", "#f3f4f6", "#e5e7eb"],
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.15,
  direction = "up",
}: WavyBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)
  const [paths, setPaths] = useState<string[]>([])
  const [animationDuration, setAnimationDuration] = useState(speed === "fast" ? "15s" : "30s")

  useEffect(() => {
    if (!containerRef.current) return

    const updateSvgHeight = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.offsetHeight)
      }
    }

    // Initial update
    updateSvgHeight()

    // Generate wave paths
    const newPaths: string[] = []
    const baseFrequency = 0.001
    const baseAmplitude = 20
    const baseOffset = 10

    for (let i = 0; i < colors.length; i++) {
      const frequency = baseFrequency + i * 0.0005
      const amplitude = baseAmplitude + i * 5
      const offset = i * baseOffset

      let path = `M 0 ${svgHeight} `
      for (let x = 0; x <= 1000; x += waveWidth) {
        const y = Math.sin(x * frequency) * amplitude
        path += `L ${x} ${svgHeight / 2 + y + offset} `
      }
      path += `L 1000 ${svgHeight} L 0 ${svgHeight}`
      newPaths.push(path)
    }
    setPaths(newPaths)

    // Update on resize
    window.addEventListener("resize", updateSvgHeight)
    return () => window.removeEventListener("resize", updateSvgHeight)
  }, [colors.length, svgHeight, waveWidth])

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col overflow-hidden", containerClassName)}
      style={{ backgroundColor: backgroundFill }}
    >
      <div className={cn("relative z-10", className)}>{children}</div>

      <div className="absolute inset-0 z-0">
        <svg
          className="absolute w-full"
          style={{
            top: direction === "down" ? 0 : "auto",
            bottom: direction === "up" ? 0 : "auto",
            filter: `blur(${blur}px)`,
          }}
          viewBox={`0 0 1000 ${svgHeight || 1000}`}
          preserveAspectRatio="none"
        >
          {paths.map((path, index) => (
            <path key={index} d={path} fill={colors[index % colors.length]} opacity={waveOpacity} className="wave-path">
              <animate
                attributeName="d"
                dur={animationDuration}
                repeatCount="indefinite"
                values={`
                  ${path};
                  ${path.replace(/(\d+\.\d+|\d+)/g, (match) => {
                    const num = Number.parseFloat(match)
                    return isNaN(num) ? match : (num + (Math.random() * 10 - 5)).toString()
                  })};
                  ${path}
                `}
              />
            </path>
          ))}
        </svg>
      </div>
    </div>
  )
}
