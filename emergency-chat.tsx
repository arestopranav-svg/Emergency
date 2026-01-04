"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, User, AlertCircle, Loader2, Heart, Flame, Home, Activity } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EmergencyChatProps {
  emergencyActive?: boolean
}

export function EmergencyChat({ emergencyActive }: EmergencyChatProps) {
  const [input, setInput] = useState("")

  // Initialize AI chat with emergency endpoint
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/emergency-chat" }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== "ready") return
    sendMessage({ text: input })
    setInput("")
  }

  // Quick emergency action buttons
  const quickActions = [
    {
      label: "Medical Emergency",
      prompt: "I need help with a medical emergency - someone is not breathing properly",
      icon: Heart,
      color: "text-red-500",
    },
    {
      label: "Fire Emergency",
      prompt: "There is a fire emergency - what should I do?",
      icon: Flame,
      color: "text-orange-500",
    },
    {
      label: "Natural Disaster",
      prompt: "I need guidance for natural disaster safety",
      icon: Home,
      color: "text-blue-500",
    },
    {
      label: "First Aid",
      prompt: "I need first aid instructions for an injury",
      icon: Activity,
      color: "text-emerald-500",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Status badge */}
      <div className="flex items-center justify-between">
        <Badge variant={status === "ready" ? "default" : "secondary"} className="text-xs">
          {status === "streaming" ? "AI is responding..." : "AI Ready"}
        </Badge>
        {emergencyActive && (
          <Badge variant="destructive" className="text-xs animate-pulse">
            Emergency Mode
          </Badge>
        )}
      </div>

      {/* Quick action buttons */}
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(action.prompt)}
              className="h-auto py-3 flex-col gap-1.5 items-start text-left"
            >
              <Icon className={`h-4 w-4 ${action.color}`} />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Chat messages area */}
      <ScrollArea className="h-[350px] w-full rounded-lg border border-border bg-card/50 p-4">
        <div className="space-y-4">
          {/* Empty state */}
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground mb-2 font-medium">Emergency AI Assistant</p>
              <p className="text-xs text-muted-foreground">Ask for emergency guidance or click a quick action above</p>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {/* Assistant avatar */}
              {message.role === "assistant" && (
                <div className="p-2 rounded-full bg-primary/10 h-fit shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`rounded-lg px-3.5 py-2.5 max-w-[85%] ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div key={index} className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                        {part.text}
                      </div>
                    )
                  }
                  return null
                })}
              </div>

              {/* User avatar */}
              {message.role === "user" && (
                <div className="p-2 rounded-full bg-primary/10 h-fit shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {status === "streaming" && (
            <div className="flex gap-2.5 justify-start">
              <div className="p-2 rounded-full bg-primary/10 h-fit">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-lg px-3.5 py-2.5 bg-muted">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your situation or ask for help..."
          disabled={status !== "ready"}
          className="flex-1"
        />
        <Button type="submit" disabled={status !== "ready" || !input.trim()} size="icon">
          {status === "streaming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>

      {/* Critical safety notice */}
      <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
        <p className="text-xs text-foreground/90 leading-relaxed">
          <strong className="text-red-500">Critical:</strong> For life-threatening emergencies, call 911 immediately.
          This AI provides guidance only and cannot replace professional emergency services.
        </p>
      </div>
    </div>
  )
}
