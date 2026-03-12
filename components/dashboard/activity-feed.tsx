"use client"

import { MessageSquare, Mail, Calendar, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "message" | "email" | "deadline" | "completed"
  title: string
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "message",
    title: "New WhatsApp message",
    description: "Sarah Chen replied to your proposal",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "deadline",
    title: "Deadline approaching",
    description: "TechFlow Inc follow-up due today",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "completed",
    title: "Lead qualified",
    description: "Nexus Systems moved to qualified",
    time: "3 hours ago",
  },
  {
    id: "4",
    type: "email",
    title: "Email received",
    description: "New inquiry from DataSync Labs",
    time: "5 hours ago",
  },
  {
    id: "5",
    type: "message",
    title: "WhatsApp conversation",
    description: "Michael Torres sent a document",
    time: "Yesterday",
  },
]

const iconMap = {
  message: MessageSquare,
  email: Mail,
  deadline: Calendar,
  completed: Check,
}

const iconStyles = {
  message: "bg-emerald-500/10 text-emerald-500",
  email: "bg-primary/10 text-primary",
  deadline: "bg-destructive/10 text-destructive",
  completed: "bg-emerald-500/10 text-emerald-500",
}

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-card-foreground">
          Recent Activity
        </h2>
        <p className="text-sm text-muted-foreground">
          Latest updates from your leads
        </p>
      </div>
      <div className="divide-y divide-border/50">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type]
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-muted/30"
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  iconStyles[activity.type]
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-card-foreground">
                  {activity.title}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
