"use client"

import { Button } from "@/components/ui/button"
import { Ambulance, Flame, Shield } from "lucide-react"

interface EmergencyCallButtonsProps {
  location: { lat: number; lng: number } | null
}

const EMERGENCY_NUMBERS = {
  police: "112", // India national emergency number
  ambulance: "108", // India ambulance service
  fire: "101", // India fire service
}

export function EmergencyCallButtons({ location }: EmergencyCallButtonsProps) {
  const handleEmergencyCall = (service: "police" | "ambulance" | "fire") => {
    const number = EMERGENCY_NUMBERS[service]

    // Log location for demonstration (in real app, would be sent to emergency services)
    if (location) {
      console.log(`[v0] Emergency call to ${service} from location: ${location.lat}, ${location.lng}`)
    }

    // Initiate phone call - works on mobile browsers
    window.location.href = `tel:${number}`
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Police */}
      <Button
        size="lg"
        onClick={() => handleEmergencyCall("police")}
        className="h-24 flex-col gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Shield className="h-8 w-8" />
        <div className="text-center">
          <div className="font-bold text-base">Police</div>
          <div className="text-xs opacity-90">{EMERGENCY_NUMBERS.police}</div>
        </div>
      </Button>

      {/* Ambulance */}
      <Button
        size="lg"
        onClick={() => handleEmergencyCall("ambulance")}
        className="h-24 flex-col gap-2 bg-red-600 hover:bg-red-700 text-white"
      >
        <Ambulance className="h-8 w-8" />
        <div className="text-center">
          <div className="font-bold text-base">Ambulance</div>
          <div className="text-xs opacity-90">{EMERGENCY_NUMBERS.ambulance}</div>
        </div>
      </Button>

      {/* Fire Department */}
      <Button
        size="lg"
        onClick={() => handleEmergencyCall("fire")}
        className="h-24 flex-col gap-2 bg-orange-600 hover:bg-orange-700 text-white"
      >
        <Flame className="h-8 w-8" />
        <div className="text-center">
          <div className="font-bold text-base">Fire</div>
          <div className="text-xs opacity-90">{EMERGENCY_NUMBERS.fire}</div>
        </div>
      </Button>
    </div>
  )
}
