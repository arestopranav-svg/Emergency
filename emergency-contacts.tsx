"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const emergencyContacts = [
  {
    id: 1,
    name: "Emergency Services (911)",
    type: "Primary",
    phone: "911",
    description: "Police, Fire, Medical emergencies",
    available: "24/7",
    priority: "critical",
  },
  {
    id: 2,
    name: "Poison Control",
    type: "Medical",
    phone: "1-800-222-1222",
    description: "Poisoning and overdose information",
    available: "24/7",
    priority: "high",
  },
  {
    id: 3,
    name: "National Suicide Prevention",
    type: "Mental Health",
    phone: "988",
    description: "Crisis counseling and mental health support",
    available: "24/7",
    priority: "high",
  },
  {
    id: 4,
    name: "Red Cross Emergency",
    type: "Disaster Relief",
    phone: "1-800-733-2767",
    description: "Disaster assistance and relief services",
    available: "24/7",
    priority: "medium",
  },
  {
    id: 5,
    name: "FBI Tips Hotline",
    type: "Security",
    phone: "1-800-225-5324",
    description: "Report suspicious activity or threats",
    available: "24/7",
    priority: "medium",
  },
  {
    id: 6,
    name: "Coast Guard Search & Rescue",
    type: "Maritime",
    phone: "1-800-323-7233",
    description: "Maritime emergencies and water rescue",
    available: "24/7",
    priority: "high",
  },
]

const localResources = [
  {
    name: "City Emergency Management",
    phone: "(555) 123-4567",
    email: "emergency@city.gov",
    address: "123 City Hall Plaza",
  },
  {
    name: "County Sheriff Department",
    phone: "(555) 987-6543",
    email: "sheriff@county.gov",
    address: "456 County Road",
  },
  {
    name: "Community Hospital ER",
    phone: "(555) 246-8135",
    email: "er@hospital.org",
    address: "789 Medical Center Dr",
  },
]

export function EmergencyContacts() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Critical Alert */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Life-Threatening Emergency?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For immediate police, fire, or medical assistance, dial 911 now.
              </p>
              <Button variant="destructive" size="lg" onClick={() => handleCall("911")} className="w-full sm:w-auto">
                <Phone className="h-4 w-4 mr-2" />
                Call 911 Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* National Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>National Emergency Services</CardTitle>
          <CardDescription>24/7 emergency hotlines and crisis support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col sm:flex-row items-start justify-between p-4 border border-border rounded-lg gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{contact.name}</h3>
                    <Badge variant="outline">{contact.type}</Badge>
                    {contact.priority === "critical" && <Badge variant="destructive">Critical</Badge>}
                    {contact.priority === "high" && <Badge className="bg-orange-500">High Priority</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{contact.available}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span className="font-mono">{contact.phone}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleCall(contact.phone)}
                  className="w-full sm:w-auto"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Local Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Local Emergency Resources</CardTitle>
          <CardDescription>Community emergency services and support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {localResources.map((resource, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                <h3 className="font-semibold text-foreground">{resource.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <a href={`tel:${resource.phone}`} className="hover:text-primary">
                      {resource.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <a href={`mailto:${resource.email}`} className="hover:text-primary break-all">
                      {resource.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{resource.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Preparedness Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Keep emergency contact numbers saved in your phone and written down</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Maintain a first aid kit and emergency supplies at home and in your vehicle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Know your exact location or address when calling emergency services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Create an emergency plan with your family and practice it regularly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Stay informed about local emergency alerts and weather warnings</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
