"use client"

import { Users, Clock, Sparkles, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ElementType
  urgent?: boolean
}

function MobileStatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  urgent,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-[120px] flex-col items-center justify-center rounded-xl border border-border bg-card p-4",
        urgent && "border-destructive/50"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          urgent ? "bg-destructive/10" : "bg-primary/10"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            urgent ? "text-destructive" : "text-primary"
          )}
        />
      </div>
      <p
        className={cn(
          "mt-2 text-xl font-bold tracking-tight",
          urgent ? "text-destructive" : "text-card-foreground"
        )}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">
        {title}
      </p>
      <div className="mt-1.5 flex items-center gap-1">
        {changeType === "positive" && (
          <TrendingUp className="h-3 w-3 text-emerald-500" />
        )}
        {changeType === "negative" && (
          <TrendingDown className="h-3 w-3 text-destructive" />
        )}
        <span
          className={cn(
            "text-[10px] font-medium",
            changeType === "positive" && "text-emerald-500",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  )
}

export function MobileStatsCards() {
  const stats: StatCardProps[] = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Deadlines Today",
      value: "7",
      change: "3 urgent",
      changeType: "negative",
      icon: Clock,
      urgent: true,
    },
    {
      title: "New Matches",
      value: "124",
      change: "+8.2%",
      changeType: "positive",
      icon: Sparkles,
    },
  ]

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {stats.map((stat) => (
        <MobileStatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
