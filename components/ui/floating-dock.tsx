"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingDockProps {
  items: Array<{
    title: string
    icon: React.ReactNode
    href: string
  }>
  className?: string
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("flex items-center justify-center space-x-4", className)}>
      {items.map((item, index) => (
        <a
          key={item.title}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out group",
            "border-2 backdrop-blur-sm",
            "dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-white/40",
            "border-gray-300 bg-gray-100/50 hover:bg-gray-200/80 hover:border-gray-400",
            hoveredIndex === index ? "scale-125 z-10" : "scale-100",
            hoveredIndex !== null && hoveredIndex !== index ? "scale-90 opacity-60" : "opacity-100",
          )}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative z-10 dark:text-white text-gray-700 group-hover:text-current transition-colors">
            {item.icon}
          </div>

          {/* Tooltip */}
          <div
            className={cn(
              "absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-xs font-medium pointer-events-none transition-opacity duration-200",
              "dark:bg-white dark:text-black",
              "bg-gray-900 text-white",
              hoveredIndex === index ? "opacity-100" : "opacity-0",
            )}
          >
            {item.title}
            <div
              className={cn(
                "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent",
                "dark:border-t-white",
                "border-t-gray-900",
              )}
            ></div>
          </div>
        </a>
      ))}
    </div>
  )
}
