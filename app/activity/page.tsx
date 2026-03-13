"use client"

import { MobileNav } from "@/components/dashboard/mobile-nav"
import { MobileHeader } from "@/components/dashboard/mobile-header"
import { MessageSquare, Mail, Calendar, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "message" | "email" | "deadline" | "completed"
  title: string
  description: string
  time: string
  date: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "message",
    title: "New WhatsApp message",
    description: "Sarah Chen replied to your proposal",
    time: "2 min ago",
    date: "Today",
  },
  {
    id: "2",
    type: "deadline",
    title: "Deadline approaching",
    description: "TechFlow Inc follow-up due today",
    time: "1 hour ago",
    date: "Today",
  },
  {
    id: "3",
    type: "completed",
    title: "Lead qualified",
    description: "Nexus Systems moved to qualified",
    time: "3 hours ago",
    date: "Today",
  },
  {
    id: "4",
    type: "email",
    title: "Email received",
    description: "New inquiry from DataSync Labs",
    time: "5 hours ago",
    date: "Today",
  },
  {
    id: "5",
    type: "message",
    title: "WhatsApp conversation",
    description: "Michael Torres sent a document",
    time: "Yesterday",
    date: "Yesterday",
  },
  {
    id: "6",
    type: "email",
    title: "Follow-up sent",
    description: "Sent proposal to CloudNine Solutions",
    time: "Yesterday",
    date: "Yesterday",
  },
  {
    id: "7",
    type: "completed",
    title: "Meeting scheduled",
    description: "Call booked with Quantum Digital",
    time: "2 days ago",
    date: "This Week",
  },
  {
    id: "8",
    type: "message",
    title: "New lead from WhatsApp",
    description: "Lisa Park inquired about services",
    time: "2 days ago",
    date: "This Week",
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

export default function ActivityPage() {
  const groupedActivities = activities.reduce(
    (groups, activity) => {
      const date = activity.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(activity)
      return groups
    },
    {} as Record<string, Activity[]>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MobileHeader />

      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Activity
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track all your latest interactions
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, items]) => (
            <div key={date}>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {date}
              </h2>
              <div className="space-y-2">
                {items.map((activity) => {
                  const Icon = iconMap[activity.type]
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          iconStyles[activity.type]
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-card-foreground">
                          {activity.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
