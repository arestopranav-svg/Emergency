"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Plus, Search, MapPin, Clock } from "lucide-react"
import { useIncidents } from "@/hooks/use-incidents"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function IncidentTracker() {
  const { incidents, addIncident, updateIncident } = useIncidents()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")

  const [newIncident, setNewIncident] = useState({
    type: "",
    description: "",
    location: "",
    severity: "medium" as "low" | "medium" | "high" | "critical",
  })

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || incident.status === filterStatus
    const matchesSeverity = filterSeverity === "all" || incident.severity === filterSeverity

    return matchesSearch && matchesStatus && matchesSeverity
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newIncident.type || !newIncident.description || !newIncident.location) return

    addIncident(newIncident)
    setNewIncident({
      type: "",
      description: "",
      location: "",
      severity: "medium",
    })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Report New Incident</DialogTitle>
                <DialogDescription>Fill in the details of the emergency incident</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Incident Type</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Medical Emergency, Fire, Accident"
                    value={newIncident.type}
                    onChange={(e) => setNewIncident({ ...newIncident, type: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the incident"
                    value={newIncident.description}
                    onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., 123 Main St, Building A"
                    value={newIncident.location}
                    onChange={(e) => setNewIncident({ ...newIncident, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select
                    value={newIncident.severity}
                    onValueChange={(value) => setNewIncident({ ...newIncident, severity: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Submit Incident Report
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Incidents List */}
      <div className="grid gap-4">
        {filteredIncidents.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No incidents found</p>
            </CardContent>
          </Card>
        ) : (
          filteredIncidents.map((incident) => (
            <Card key={incident.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div
                    className={`p-3 rounded-lg h-fit ${
                      incident.severity === "critical"
                        ? "bg-destructive/10"
                        : incident.severity === "high"
                          ? "bg-orange-500/10"
                          : incident.severity === "medium"
                            ? "bg-yellow-500/10"
                            : "bg-blue-500/10"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-6 w-6 ${
                        incident.severity === "critical"
                          ? "text-destructive"
                          : incident.severity === "high"
                            ? "text-orange-500"
                            : incident.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                      }`}
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{incident.type}</h3>
                        <Badge variant={incident.status === "active" ? "default" : "secondary"}>
                          {incident.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            incident.severity === "critical"
                              ? "border-destructive text-destructive"
                              : incident.severity === "high"
                                ? "border-orange-500 text-orange-500"
                                : incident.severity === "medium"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "border-blue-500 text-blue-500"
                          }
                        >
                          {incident.severity}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{incident.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{incident.time}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {incident.status === "active" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateIncident(incident.id, { status: "monitoring" })}
                          >
                            Monitor
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => updateIncident(incident.id, { status: "resolved" })}
                          >
                            Resolve
                          </Button>
                        </>
                      )}
                      {incident.status === "monitoring" && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => updateIncident(incident.id, { status: "resolved" })}
                        >
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
