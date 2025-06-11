"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterEffectProps {
  words: Array<{
    text: string
    className?: string
  }>
  className?: string
  cursorClassName?: string
}

export function TypewriterEffect({ words, className, cursorClassName }: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    const shouldDelete = isDeleting && currentText === ""
    const shouldType = !isDeleting && currentText === word.text

    if (shouldDelete) {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    if (shouldType) {
      setTimeout(() => setIsDeleting(true), 2000)
      return
    }

    const timeout = setTimeout(
      () => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return word.text.substring(0, prev.length - 1)
          }
          return word.text.substring(0, prev.length + 1)
        })
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <div className={cn("", className)}>
      <span className={words[currentWordIndex]?.className}>{currentText}</span>
      <span className={cn("animate-pulse", cursorClassName)}>|</span>
    </div>
  )
}
