"use client"

import { MessageSquare, Mail, MoreHorizontal, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Lead {
  id: string
  name: string
  company: string
  source: "whatsapp" | "email"
  status: "new" | "contacted" | "qualified" | "urgent"
  deadline: string
  value: string
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Sarah Chen",
    company: "TechFlow Inc",
    source: "whatsapp",
    status: "urgent",
    deadline: "Today",
    value: "$45,000",
  },
  {
    id: "2",
    name: "Michael Torres",
    company: "DataSync Labs",
    source: "email",
    status: "new",
    deadline: "Tomorrow",
    value: "$28,500",
  },
  {
    id: "3",
    name: "Emma Williams",
    company: "CloudNine Solutions",
    source: "whatsapp",
    status: "contacted",
    deadline: "In 3 days",
    value: "$67,200",
  },
  {
    id: "4",
    name: "James Rodriguez",
    company: "Nexus Systems",
    source: "email",
    status: "qualified",
    deadline: "In 5 days",
    value: "$89,000",
  },
  {
    id: "5",
    name: "Lisa Park",
    company: "Quantum Digital",
    source: "whatsapp",
    status: "urgent",
    deadline: "Today",
    value: "$32,750",
  },
]

const statusStyles = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-muted text-muted-foreground",
  qualified: "bg-emerald-500/10 text-emerald-500",
  urgent: "bg-destructive/10 text-destructive",
}

export function RecentLeads() {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Recent Leads
          </h2>
          <p className="text-sm text-muted-foreground">
            Your latest opportunities from all sources
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View all
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted-foreground">
              <th className="px-6 py-3 font-medium">Contact</th>
              <th className="px-6 py-3 font-medium">Source</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Deadline</th>
              <th className="px-6 py-3 font-medium text-right">Value</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {lead.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lead.company}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {lead.source === "whatsapp" ? (
                      <MessageSquare className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                    <span className="text-sm capitalize text-muted-foreground">
                      {lead.source}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      statusStyles[lead.status]
                    )}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "text-sm",
                      lead.deadline === "Today"
                        ? "font-medium text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    {lead.deadline}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-medium text-card-foreground">
                    {lead.value}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
