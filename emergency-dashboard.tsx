"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield, Activity, Clock, MapPin, TrendingUp } from "lucide-react"
import { useIncidents } from "@/hooks/use-incidents"

export function EmergencyDashboard() {
  const { incidents, stats } = useIncidents()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const activeIncidents = incidents.filter((i) => i.status === "active")
  const criticalIncidents = incidents.filter((i) => i.severity === "critical")

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <Card className="border-primary bg-card/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">System Status: Operational</h2>
                <p className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString()} - All systems online</p>
              </div>
            </div>
            <Button size="lg" variant="default" className="w-full sm:w-auto">
              Report Emergency
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{activeIncidents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.resolved} resolved today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{criticalIncidents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.avgResponseTime}m</div>
            <p className="text-xs text-muted-foreground mt-1">15% faster than last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Handled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All time incidents</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>Latest emergency reports and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.slice(0, 5).map((incident) => (
              <div
                key={incident.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg gap-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`mt-1 p-2 rounded-full ${
                      incident.severity === "critical"
                        ? "bg-destructive/10"
                        : incident.severity === "high"
                          ? "bg-orange-500/10"
                          : "bg-yellow-500/10"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        incident.severity === "critical"
                          ? "text-destructive"
                          : incident.severity === "high"
                            ? "text-orange-500"
                            : "text-yellow-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{incident.type}</h3>
                      <Badge variant={incident.status === "active" ? "default" : "secondary"}>{incident.status}</Badge>
                      <Badge variant="outline">{incident.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{incident.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{incident.location}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{incident.time}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
