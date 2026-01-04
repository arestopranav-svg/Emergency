"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmergencyButtonProps {
  onEmergencyActivated: () => void
  isActive: boolean
}

export function EmergencyButton({ onEmergencyActivated, isActive }: EmergencyButtonProps) {
  // Hold-to-confirm mechanic to prevent accidental activation
  const [holdProgress, setHoldProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)

  let holdInterval: NodeJS.Timeout

  const handleMouseDown = () => {
    if (isActive) return

    setIsHolding(true)
    let progress = 0

    // Increase progress over 2 seconds
    holdInterval = setInterval(() => {
      progress += 5
      setHoldProgress(progress)

      if (progress >= 100) {
        clearInterval(holdInterval)
        setIsHolding(false)
        setHoldProgress(0)
        onEmergencyActivated()
      }
    }, 100)
  }

  const handleMouseUp = () => {
    setIsHolding(false)
    setHoldProgress(0)
    clearInterval(holdInterval)
  }

  return (
    <div className="relative">
      <Button
        size="lg"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        disabled={isActive}
        className={cn(
          "w-full h-32 text-xl font-bold relative overflow-hidden transition-all",
          isActive
            ? "bg-emerald-600 hover:bg-emerald-600 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 active:scale-95",
        )}
      >
        {/* Progress bar background */}
        {isHolding && (
          <div
            className="absolute inset-0 bg-white/20 transition-all duration-100"
            style={{ width: `${holdProgress}%` }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center gap-3">
          {isActive ? (
            <>
              <CheckCircle className="h-12 w-12" />
              <div>
                <div className="text-2xl font-bold">Emergency Activated</div>
                <div className="text-sm font-normal opacity-90">Help is on the way</div>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="h-12 w-12 animate-pulse" />
              <div>
                <div className="text-2xl font-bold">Emergency</div>
                <div className="text-sm font-normal opacity-90">
                  {isHolding ? "Keep Holding..." : "Press & Hold to Activate"}
                </div>
              </div>
            </>
          )}
        </div>
      </Button>
    </div>
  )
}
