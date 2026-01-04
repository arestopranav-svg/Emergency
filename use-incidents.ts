"use client"

import { useState, useEffect } from "react"

export type Incident = {
  id: string
  type: string
  description: string
  location: string
  severity: "low" | "medium" | "high" | "critical"
  status: "active" | "monitoring" | "resolved"
  time: string
  reportedBy?: string
}

const STORAGE_KEY = "emergency-incidents"

const initialIncidents: Incident[] = [
  {
    id: "1",
    type: "Medical Emergency",
    description: "Cardiac arrest reported in downtown area, ambulance dispatched",
    location: "Downtown Plaza, 5th & Main",
    severity: "critical",
    status: "active",
    time: "2 minutes ago",
    reportedBy: "System",
  },
  {
    id: "2",
    type: "Fire Alert",
    description: "Small kitchen fire contained by building sprinklers",
    location: "Riverside Apartments, Building C",
    severity: "high",
    status: "monitoring",
    time: "15 minutes ago",
    reportedBy: "Fire Department",
  },
  {
    id: "3",
    type: "Traffic Accident",
    description: "Multi-vehicle collision blocking two lanes, minor injuries",
    location: "Highway 101 Southbound, Mile 47",
    severity: "medium",
    status: "active",
    time: "23 minutes ago",
    reportedBy: "Highway Patrol",
  },
  {
    id: "4",
    type: "Power Outage",
    description: "Transformer failure affecting residential area",
    location: "Oakwood District, Sector 3",
    severity: "medium",
    status: "active",
    time: "45 minutes ago",
    reportedBy: "Utility Company",
  },
  {
    id: "5",
    type: "Suspicious Activity",
    description: "Report of unattended package at transit station, bomb squad notified",
    location: "Central Station, Platform 2",
    severity: "high",
    status: "active",
    time: "1 hour ago",
    reportedBy: "Security",
  },
]

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])

  // Load incidents from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setIncidents(JSON.parse(stored))
      } catch {
        setIncidents(initialIncidents)
      }
    } else {
      setIncidents(initialIncidents)
    }
  }, [])

  // Save to localStorage whenever incidents change
  useEffect(() => {
    if (incidents.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents))
    }
  }, [incidents])

  const addIncident = (incident: Omit<Incident, "id" | "time" | "status">) => {
    const newIncident: Incident = {
      ...incident,
      id: Date.now().toString(),
      status: "active",
      time: "Just now",
    }
    setIncidents((prev) => [newIncident, ...prev])
  }

  const updateIncident = (id: string, updates: Partial<Incident>) => {
    setIncidents((prev) => prev.map((incident) => (incident.id === id ? { ...incident, ...updates } : incident)))
  }

  const deleteIncident = (id: string) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id))
  }

  const stats = {
    total: incidents.length,
    active: incidents.filter((i) => i.status === "active").length,
    resolved: incidents.filter((i) => i.status === "resolved").length,
    avgResponseTime: 8,
  }

  return {
    incidents,
    addIncident,
    updateIncident,
    deleteIncident,
    stats,
  }
}
