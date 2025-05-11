"use client"

import { useState, useCallback } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastProps {
  id: string
  visible: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({ title, description, variant = "default", duration = 5000 }: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9)
      
      const newToast: Toast = {
        id,
        title,
        description,
        variant,
        visible: true,
        duration,
      }
      
      setToasts((prev) => [...prev, newToast])
      
      // Auto dismiss
      setTimeout(() => {
        setToasts((prev) => 
          prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
        )
        
        // Remove from DOM after animation
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 300)
      }, duration)
    },
    []
  )

  return { toast, toasts }
}