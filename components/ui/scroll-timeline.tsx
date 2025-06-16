"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface TimelineItem {
  title: string
  company: string
  period: string
  description: string
  image: string
  technologies: string[]
}

interface ScrollTimelineProps {
  items: TimelineItem[]
  className?: string
  theme?: 'light' | 'dark'
}

export function ScrollTimeline({ items, className, theme = 'light' }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !lineRef.current) return

      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate line progress based on scroll position - can reset when scrolling back up
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const startOffset = windowHeight * 0.8 // Start animation when container is 80% visible
      const endOffset = windowHeight * 0.2 // End animation when container is 20% from top

      let progress = 0
      if (containerTop <= startOffset) {
        const scrolled = startOffset - containerTop
        const totalScrollDistance = containerHeight + startOffset - endOffset
        progress = Math.max(0, Math.min(scrolled / totalScrollDistance, 1))
      }

      setLineProgress(progress)

      // Reset visibility when scrolling back up past the section
      if (containerTop > windowHeight) {
        setVisibleItems(new Set())
        return
      }

      // Check visibility of individual items - can reset when scrolling back up
      const items = container.querySelectorAll("[data-timeline-item]")

      setVisibleItems((prevVisible) => {
        const newVisibleItems = new Set<number>()

        items.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect()
          const itemTop = itemRect.top
          const itemBottom = itemRect.bottom

          // Item is visible when it's in the viewport
          if (itemTop <= windowHeight * 0.8 && itemBottom >= windowHeight * 0.2) {
            newVisibleItems.add(index)
          }
        })

        return newVisibleItems
      })
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    // Cleanup function
    return () => {
      gsap.killTweensOf('*')
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      
      // Remove event listeners
      const items = document.querySelectorAll('[data-timeline-item]')
      items.forEach(item => {
        const imageContainer = item.querySelector('.relative')
        if (imageContainer) {
          const newImageContainer = imageContainer.cloneNode(true)
          imageContainer.parentNode?.replaceChild(newImageContainer, imageContainer)
        }
      })
      
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  // Removed GSAP animations from experience section

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Timeline line container - only animated line, no background */}
      <div className="absolute left-8 top-0 w-0.5 h-full">
        {/* Animated progress line only */}
        <div
          ref={lineRef}
          className="w-full bg-gradient-to-b from-white via-gray-300 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-600 transition-all duration-300 ease-out"
          style={{
            height: `${lineProgress * 100}%`,
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Timeline items */}
      <div className="space-y-16 md:space-y-20 lg:space-y-24">
        {items.map((item, index) => (
          <div
            key={index}
            data-timeline-item
            className={cn(
              "relative transition-all duration-700 ease-out",
              visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
            )}
            style={{
              transitionDelay: visibleItems.has(index) ? `${index * 100}ms` : "0ms",
            }}
          >
            {/* Timeline dot */}
            <div
              className={cn(
                "absolute left-6 w-4 h-4 rounded-full z-10 border-4 transition-all duration-500",
                visibleItems.has(index)
                  ? "bg-gray-950 dark:bg-white border-white dark:border-gray-950 scale-100"
                  : "bg-transparent border-gray-400 dark:border-gray-500 scale-75",
              )}
            />

            {/* Content */}
            <div className="ml-12 md:ml-16 flex-1">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Text content */}
                <div
                  className={cn(
                    "space-y-5 transition-all duration-700 ease-out",
                    visibleItems.has(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
                  )}
                  style={{
                    transitionDelay: visibleItems.has(index) ? `${index * 100 + 200}ms` : "0ms",
                  }}
                >
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">{item.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{item.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div
                  className={cn(
                    "relative transition-all duration-700 ease-out",
                    visibleItems.has(index)
                      ? "opacity-100 translate-x-0 scale-100"
                      : "opacity-0 translate-x-8 scale-95",
                  )}
                  style={{
                    transitionDelay: visibleItems.has(index) ? `${index * 100 + 400}ms` : "0ms",
                  }}
                >
                  <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 relative flex items-center justify-center group">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20 dark:opacity-10">
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: '60px 60px',
                          backgroundRepeat: 'repeat',
                          ...(theme === 'dark' ? {
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A0AEC0' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                          } : {})
                        }}
                      />
                    </div>
                    
                    {/* Image container with centered content */}
                    <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 relative z-10">
                      <img
                        src={item.image || "/placeholder.svg?height=300&width=500"}
                        alt={`${item.title} at ${item.company}`}
                        className={`transition-all duration-500 group-hover:scale-105 ${
                          item.image?.includes('graduatepicfinal') 
                            ? 'object-contain max-h-[80%] w-auto shadow-lg rounded-lg' 
                            : item.image?.includes('click-creatives') || item.image?.includes('Techstars')
                            ? 'object-contain max-h-full max-w-full rounded-lg shadow-md'
                            : 'object-cover w-full h-full rounded-lg'
                        }`}
                        style={{
                          maxHeight: item.image?.includes('graduatepicfinal') ? '80%' : '100%',
                          maxWidth: '100%',
                          width: (item.image?.includes('graduatepicfinal') || item.image?.includes('Techstars')) ? 'auto' : '100%',
                          height: (item.image?.includes('graduatepicfinal') || item.image?.includes('Techstars')) ? 'auto' : '100%',
                          objectFit: (item.image?.includes('graduatepicfinal') || item.image?.includes('click-creatives') || item.image?.includes('Techstars')) ? 'contain' : 'cover',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(2px)'
                        }}
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl pointer-events-none" />

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/0 to-purple-100/0 group-hover:from-blue-100/30 group-hover:to-purple-100/30 dark:group-hover:from-gray-700/30 dark:group-hover:to-gray-800/30 rounded-xl transition-all duration-500 pointer-events-none" />
                    
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400 dark:border-blue-500 opacity-70 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 dark:border-purple-500 opacity-70 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 dark:border-purple-500 opacity-70 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400 dark:border-blue-500 opacity-70 rounded-br-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
