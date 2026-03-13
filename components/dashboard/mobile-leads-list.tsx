"use client"

import { MessageSquare, Mail, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Lead {
  id: string
  name: string
  company: string
  source: "whatsapp" | "email"
  status: "new" | "contacted" | "qualified" | "urgent"
  deadline: string
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Sarah Chen",
    company: "TechFlow Inc",
    source: "whatsapp",
    status: "urgent",
    deadline: "Today",
  },
  {
    id: "2",
    name: "Michael Torres",
    company: "DataSync Labs",
    source: "email",
    status: "new",
    deadline: "Tomorrow",
  },
  {
    id: "3",
    name: "Emma Williams",
    company: "CloudNine Solutions",
    source: "whatsapp",
    status: "contacted",
    deadline: "In 3 days",
  },
  {
    id: "4",
    name: "James Rodriguez",
    company: "Nexus Systems",
    source: "email",
    status: "qualified",
    deadline: "In 5 days",
  },
  {
    id: "5",
    name: "Lisa Park",
    company: "Quantum Digital",
    source: "whatsapp",
    status: "urgent",
    deadline: "Today",
  },
]

const statusStyles = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-muted text-muted-foreground",
  qualified: "bg-emerald-500/10 text-emerald-500",
  urgent: "bg-destructive/10 text-destructive",
}

export function MobileLeadsList() {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 className="text-base font-semibold text-card-foreground">
            Recent Leads
          </h2>
          <p className="text-xs text-muted-foreground">
            Your latest opportunities
          </p>
        </div>
        <button className="text-xs font-medium text-primary">View all</button>
      </div>

      {/* Lead Cards */}
      <div className="divide-y divide-border/50">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center gap-3 px-4 py-3 active:bg-muted/30"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-card-foreground">
                  {lead.name}
                </p>
                {lead.source === "whatsapp" ? (
                  <MessageSquare className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {lead.company}
              </p>
            </div>

            {/* Status & Deadline */}
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                  statusStyles[lead.status]
                )}
              >
                {lead.status}
              </span>
              <span
                className={cn(
                  "text-[10px]",
                  lead.deadline === "Today"
                    ? "font-medium text-destructive"
                    : "text-muted-foreground"
                )}
              >
                {lead.deadline}
              </span>
            </div>

            {/* Chevron */}
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  )
}
