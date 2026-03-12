"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { 
  Bell, 
  Clock, 
  Building2, 
  MessageSquare, 
  Mail, 
  AlertTriangle,
  CheckCircle2,
  Filter,
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
    description: "Senior Software Engineer position at Google - Submit your application before the deadline.",
    company: "Google",
    companyId: "google",
    deadline: "Mar 14, 2026",
    daysUntilDeadline: 1,
    timestamp: "2 hours ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "2",
    type: "company",
    source: "whatsapp",
    title: "New Message from Google Recruiter",
    description: "Hi! I noticed your profile and wanted to discuss a potential opportunity...",
    company: "Google",
    companyId: "google",
    timestamp: "3 hours ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "3",
    type: "deadline",
    source: "email",
    title: "Interview Reminder",
    description: "Your technical interview with Microsoft is scheduled for tomorrow at 2 PM PST.",
    company: "Microsoft",
    companyId: "microsoft",
    deadline: "Mar 14, 2026",
    daysUntilDeadline: 1,
    timestamp: "4 hours ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "4",
    type: "company",
    source: "linkedin",
    title: "Connection Request from Meta Engineer",
    description: "A Senior Engineer at Meta wants to connect with you.",
    company: "Meta",
    companyId: "meta",
    timestamp: "5 hours ago",
    isRead: false,
    priority: "medium",
  },
  {
    id: "5",
    type: "deadline",
    source: "email",
    title: "Offer Expires in 3 Days",
    description: "Your offer from NVIDIA for ML Engineer position expires soon.",
    company: "NVIDIA",
    companyId: "nvidia",
    deadline: "Mar 16, 2026",
    daysUntilDeadline: 3,
    timestamp: "6 hours ago",
    isRead: true,
    priority: "high",
  },
  {
    id: "6",
    type: "company",
    source: "email",
    title: "Application Update from Apple",
    description: "Your application status has been updated. Click to view details.",
    company: "Apple",
    companyId: "apple",
    timestamp: "8 hours ago",
    isRead: true,
    priority: "medium",
  },
  {
    id: "7",
    type: "message",
    source: "whatsapp",
    title: "Recruiter Follow-up",
    description: "Just wanted to check in regarding our previous conversation about the Stripe opportunity.",
    company: "Stripe",
    companyId: "stripe",
    timestamp: "1 day ago",
    isRead: true,
    priority: "medium",
  },
  {
    id: "8",
    type: "deadline",
    source: "email",
    title: "Assessment Due in 5 Days",
    description: "Complete the Amazon coding assessment before the deadline.",
    company: "Amazon",
    companyId: "amazon",
    deadline: "Mar 18, 2026",
    daysUntilDeadline: 5,
    timestamp: "1 day ago",
    isRead: true,
    priority: "medium",
  },
  {
    id: "9",
    type: "company",
    source: "linkedin",
    title: "Job Alert: Tesla",
    description: "New Autopilot Engineer position matches your profile.",
    company: "Tesla",
    companyId: "tesla",
    timestamp: "2 days ago",
    isRead: true,
    priority: "low",
  },
  {
    id: "10",
    type: "message",
    source: "email",
    title: "Thank You Note from Netflix",
    description: "Thank you for interviewing with us. We will be in touch soon.",
    company: "Netflix",
    companyId: "netflix",
    timestamp: "3 days ago",
    isRead: true,
    priority: "low",
  },
]

type FilterType = "all" | "deadline" | "company"

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>("all")
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

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  // Get unique companies from notifications that are also in tracked companies
  const notificationCompanies = [...new Set(
    notifications
      .filter((n) => n.companyId && trackedCompanies.includes(n.companyId))
      .map((n) => ({ id: n.companyId!, name: n.company! }))
  )].reduce((acc, curr) => {
    if (!acc.find((c) => c.id === curr.id)) {
      acc.push(curr)
    }
    return acc
  }, [] as { id: string; name: string }[])

  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (activeFilter === "deadline" && notification.type !== "deadline") return false
    if (activeFilter === "company" && notification.type !== "company") return false

    // Filter by company (only if selected and company is tracked)
    if (selectedCompanyFilter !== "all") {
      if (notification.companyId !== selectedCompanyFilter) return false
    }

    // Only show notifications from tracked companies (if any are tracked)
    if (trackedCompanies.length > 0 && notification.companyId) {
      if (!trackedCompanies.includes(notification.companyId)) return false
    }

    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const deadlineCount = notifications.filter((n) => n.type === "deadline" && n.daysUntilDeadline && n.daysUntilDeadline <= 3).length

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
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="pl-16">
        <TopNav />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Notifications
              </h1>
              <p className="mt-1 text-muted-foreground">
                High priority alerts from your tracked companies
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{deadlineCount}</p>
                  <p className="text-sm text-muted-foreground">Urgent Deadlines</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{trackedCompanies.length}</p>
                  <p className="text-sm text-muted-foreground">Tracked Companies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter by:</span>
            </div>
            
            {/* Type Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  activeFilter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("deadline")}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  activeFilter === "deadline"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                <Clock className="h-3.5 w-3.5" />
                Deadline Approaching
              </button>
              <button
                onClick={() => setActiveFilter("company")}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  activeFilter === "company"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                <Building2 className="h-3.5 w-3.5" />
                Top Companies
              </button>
            </div>

            {/* Company Filter Dropdown */}
            <div className="sm:ml-auto">
              <select
                value={selectedCompanyFilter}
                onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Companies</option>
                {notificationCompanies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    "group cursor-pointer rounded-lg border p-4 transition-all hover:border-primary/50",
                    getPriorityStyles(notification.priority, notification.isRead)
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Source Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      {getSourceIcon(notification.source)}
                    </div>

                    {/* Content */}
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
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        {notification.company && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
                            <Building2 className="h-3 w-3" />
                            {notification.company}
                          </span>
                        )}
                        {notification.deadline && (
                          <span className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                            notification.daysUntilDeadline && notification.daysUntilDeadline <= 1
                              ? "bg-destructive/10 text-destructive"
                              : notification.daysUntilDeadline && notification.daysUntilDeadline <= 3
                              ? "bg-destructive/10 text-destructive"
                              : "bg-secondary text-muted-foreground"
                          )}>
                            <Clock className="h-3 w-3" />
                            {notification.daysUntilDeadline === 1
                              ? "Due Tomorrow"
                              : `${notification.daysUntilDeadline} days left`}
                          </span>
                        )}
                        <span className="text-xs capitalize text-muted-foreground">
                          via {notification.source}
                        </span>
                      </div>
                    </div>

                    {/* Read Indicator */}
                    {notification.isRead && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">No notifications match your filters.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {trackedCompanies.length === 0 
                    ? "Set up your preferences to start tracking companies." 
                    : "Try adjusting your filters to see more notifications."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
