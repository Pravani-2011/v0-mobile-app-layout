"use client"

import { useState, useEffect } from "react"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { MobileHeader } from "@/components/dashboard/mobile-header"
import { 
  Bell, 
  Clock, 
  Building2, 
  MessageSquare, 
  Mail, 
  AlertTriangle,
  CheckCircle2,
  Linkedin
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "deadline" | "company" | "message"
  source: "whatsapp" | "email" | "linkedin"
  title: string
  description: string
  company?: string
  companyId?: string
  deadline?: string
  daysUntilDeadline?: number
  timestamp: string
  isRead: boolean
  priority: "high" | "medium" | "low"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "deadline",
    source: "email",
    title: "Application Deadline Tomorrow",
    description: "Senior Software Engineer position at Google",
    company: "Google",
    companyId: "google",
    deadline: "Mar 14, 2026",
    daysUntilDeadline: 1,
    timestamp: "2h ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "2",
    type: "company",
    source: "whatsapp",
    title: "New Message from Recruiter",
    description: "Hi! I wanted to discuss a potential opportunity...",
    company: "Google",
    companyId: "google",
    timestamp: "3h ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "3",
    type: "deadline",
    source: "email",
    title: "Interview Reminder",
    description: "Technical interview scheduled for tomorrow",
    company: "Microsoft",
    companyId: "microsoft",
    deadline: "Mar 14, 2026",
    daysUntilDeadline: 1,
    timestamp: "4h ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "4",
    type: "company",
    source: "linkedin",
    title: "Connection Request",
    description: "A Senior Engineer at Meta wants to connect",
    company: "Meta",
    companyId: "meta",
    timestamp: "5h ago",
    isRead: false,
    priority: "medium",
  },
  {
    id: "5",
    type: "deadline",
    source: "email",
    title: "Offer Expires in 3 Days",
    description: "Your offer from NVIDIA expires soon",
    company: "NVIDIA",
    companyId: "nvidia",
    deadline: "Mar 16, 2026",
    daysUntilDeadline: 3,
    timestamp: "6h ago",
    isRead: true,
    priority: "high",
  },
  {
    id: "6",
    type: "company",
    source: "email",
    title: "Application Update",
    description: "Your application status has been updated",
    company: "Apple",
    companyId: "apple",
    timestamp: "8h ago",
    isRead: true,
    priority: "medium",
  },
]

type FilterType = "all" | "deadline" | "company"

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [trackedCompanies, setTrackedCompanies] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("chattrack_keywords")
    if (stored) {
      setTrackedCompanies(JSON.parse(stored))
    }
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "deadline" && notification.type !== "deadline") return false
    if (activeFilter === "company" && notification.type !== "company") return false
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "email":
        return <Mail className="h-4 w-4 text-primary" />
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-400" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityStyles = (priority: string, isRead: boolean) => {
    if (isRead) return "border-border bg-card/50"
    switch (priority) {
      case "high":
        return "border-destructive/50 bg-destructive/5"
      case "medium":
        return "border-primary/30 bg-primary/5"
      default:
        return "border-border bg-card"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MobileHeader />

      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {unreadCount} unread alerts
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mb-4 flex gap-3 overflow-x-auto scrollbar-hide">
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Bell className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{unreadCount}</span>
            <span className="text-xs text-muted-foreground">Unread</span>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium">
              {notifications.filter((n) => n.daysUntilDeadline && n.daysUntilDeadline <= 3).length}
            </span>
            <span className="text-xs text-muted-foreground">Urgent</span>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{trackedCompanies.length}</span>
            <span className="text-xs text-muted-foreground">Tracked</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            )}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("deadline")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeFilter === "deadline"
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            Deadlines
          </button>
          <button
            onClick={() => setActiveFilter("company")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeFilter === "company"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Building2 className="h-3.5 w-3.5" />
            Companies
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  "rounded-xl border p-4 transition-all active:scale-[0.98]",
                  getPriorityStyles(notification.priority, notification.isRead)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    {getSourceIcon(notification.source)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className={cn(
                          "text-sm font-medium",
                          notification.isRead ? "text-muted-foreground" : "text-foreground"
                        )}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {notification.company && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                          <Building2 className="h-2.5 w-2.5" />
                          {notification.company}
                        </span>
                      )}
                      {notification.deadline && (
                        <span className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          notification.daysUntilDeadline && notification.daysUntilDeadline <= 1
                            ? "bg-destructive/10 text-destructive"
                            : "bg-secondary text-muted-foreground"
                        )}>
                          <Clock className="h-2.5 w-2.5" />
                          {notification.daysUntilDeadline === 1
                            ? "Tomorrow"
                            : `${notification.daysUntilDeadline}d left`}
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground">
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>

                  {notification.isRead && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
              <Bell className="mb-4 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
