"use client"

import { useState } from "react"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePlaceholderProps {
  src?: string
  alt?: string
  className?: string
  width?: number
  height?: number
}

export function ImagePlaceholder({
  src,
  alt = "Profile image",
  className,
  width = 400,
  height = 500,
}: ImagePlaceholderProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg",
        className,
      )}
      style={{ width, height }}
    >
      {src && !imageError ? (
        <>
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Profile Image</p>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/10 rounded-full"></div>
      <div className="absolute top-1/2 left-4 w-1 h-1 bg-white/30 rounded-full"></div>
    </div>
  )
}
