"use client"

import { useEffect, useState } from "react"
import { Mail, MailOpen, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface NotificationCounts {
  unread: number
  read: number
  tracked: number
}

export function NotificationStats() {
  const router = useRouter()
  const [counts, setCounts] = useState<NotificationCounts>({
    unread: 4,
    read: 6,
    tracked: 0,
  })

  useEffect(() => {
    const stored = localStorage.getItem("chattrack_keywords")
    if (stored) {
      const keywords = JSON.parse(stored)
      setCounts((prev) => ({ ...prev, tracked: keywords.length }))
    }
  }, [])

  const stats = [
    {
      label: "Unread",
      value: counts.unread,
      icon: Mail,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Read",
      value: counts.read,
      icon: MailOpen,
      color: "text-muted-foreground",
      bgColor: "bg-secondary",
    },
    {
      label: "Tracked",
      value: counts.tracked,
      icon: Building2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ]

  return (
    <div 
      className="flex cursor-pointer flex-col gap-3"
      onClick={() => router.push("/notifications")}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor}`}>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </div>
          <span className="mt-1.5 text-lg font-bold text-foreground">{stat.value}</span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
