"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TimelineEntry {
  year: string
  title: string
  description: string
  content?: React.ReactNode
}

interface TimelineProps {
  data: TimelineEntry[]
  className?: string
}

export function Timeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  return (
    <div ref={ref} className={cn("relative max-w-7xl mx-auto", className)}>
      {data.map((item, index) => (
        <div key={index} className="flex justify-start pt-10 md:pt-20 md:gap-10">
          <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
            </div>
            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
              {item.year}
            </h3>
          </div>

          <div className="relative pl-20 pr-4 md:pl-4 w-full">
            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
              {item.year}
            </h3>
            <div className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm lg:text-base font-normal mb-4">
              {item.title}
            </div>
            <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base lg:text-lg font-normal mb-8">
              {item.description}
            </div>
            {item.content && <div className="mb-8">{item.content}</div>}
          </div>
        </div>
      ))}
      <div
        style={{
          height: height + "px",
        }}
        className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
      >
        <div className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full" />
      </div>
    </div>
  )
}
