"use client"

import { useState, useEffect } from "react"
import { Phone, MessageSquare, AlertCircle, Shield, Siren, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmergencyChat } from "@/components/emergency-chat"
import { EmergencyButton } from "@/components/emergency-button"
import { EmergencyCallButtons } from "@/components/emergency-call-buttons"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  // Track if emergency mode is active
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [locationStatus, setLocationStatus] = useState<"loading" | "success" | "error">("loading")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user location on mount for emergency services
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationStatus("success")
          console.log("[v0] Location obtained:", position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.log("[v0] Location error:", error.message)
          setLocationStatus("error")
        },
      )
    } else {
      setLocationStatus("error")
    }
  }, [])

  // Handle emergency activation
  const handleEmergencyActivation = () => {
    setEmergencyActive(true)
    console.log("[v0] Emergency activated")

    // Vibrate device if supported (mobile feature)
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-7 w-7 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Emergency Assistant</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Emergency Response</p>
              </div>
            </div>

            {/* Location status indicator */}
            <div className="flex items-center gap-2">
              {locationStatus === "success" && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <Activity className="h-3 w-3" />
                  <span className="hidden sm:inline">Location Active</span>
                </div>
              )}
              {locationStatus === "error" && (
                <div className="flex items-center gap-1.5 text-xs text-amber-500">
                  <AlertCircle className="h-3 w-3" />
                  <span className="hidden sm:inline">Location Off</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-20">
        {/* Emergency Alert Banner */}
        {emergencyActive && (
          <Alert className="mb-6 border-red-500/50 bg-red-500/10">
            <Siren className="h-5 w-5 text-red-500 animate-pulse" />
            <AlertDescription className="text-foreground">
              <span className="font-semibold">Emergency Mode Active</span> - Help is on the way. Stay calm and follow
              the AI assistant's guidance.
            </AlertDescription>
          </Alert>
        )}

        {/* Emergency Detection Button - Primary CTA */}
        <div className="mb-8">
          <EmergencyButton onEmergencyActivated={handleEmergencyActivation} isActive={emergencyActive} />
        </div>

        {/* One-Tap Emergency Call Buttons */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Emergency Services</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            One-tap direct calling to emergency services. Your location will be shared automatically.
          </p>
          <EmergencyCallButtons location={userLocation} />
        </Card>

        {/* AI Assistant Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">AI Emergency Assistant</h2>
            </div>
            <Button variant={showChat ? "secondary" : "default"} size="sm" onClick={() => setShowChat(!showChat)}>
              {showChat ? "Hide" : "Chat Now"}
            </Button>
          </div>

          {!showChat ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Get instant AI-powered emergency guidance and support. The assistant can help with:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>First aid instructions and medical emergencies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Emergency situation assessment and guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Finding nearby hospitals and emergency services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Safety tips and disaster preparedness</span>
                </li>
              </ul>
            </div>
          ) : (
            <EmergencyChat emergencyActive={emergencyActive} />
          )}
        </Card>

        {/* Emergency Tips */}
        <Card className="p-6 mt-6 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Safety Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• In a real emergency, always call local emergency services first</li>
                <li>• Stay calm and provide clear information to operators</li>
                <li>• Share your exact location and describe the situation</li>
                <li>• Follow the AI assistant's guidance while waiting for help</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
