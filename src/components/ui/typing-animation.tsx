"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  texts?: string[]
  className?: string
  speed?: number
  deletionSpeed?: number
  delayBetweenTexts?: number
}

export function TypingAnimation({
  texts = [
    "Ask about tenant rights in Delhi...",
    "Help me draft a rental agreement...",
    "Explain the process for filing a consumer complaint...",
    "Review my employment contract...",
    "What are my rights in a divorce proceeding?",
  ],
  className,
  speed = 50,
  deletionSpeed = 30,
  delayBetweenTexts = 2000,
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!texts.length) return

    let timeout: NodeJS.Timeout

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, delayBetweenTexts)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        return
      }

      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText.slice(0, -1))
      }, deletionSpeed)
    } else {
      const fullText = texts[currentTextIndex]
      if (currentText === fullText) {
        setIsPaused(true)
        return
      }

      timeout = setTimeout(() => {
        setCurrentText((prevText) => fullText.slice(0, prevText.length + 1))
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deletionSpeed, delayBetweenTexts])

  return <span className={cn("text-gray-400", className)}>{currentText}</span>
}
