"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  Settings,
  Archive,
  ChevronRight,
} from "lucide-react"

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  badge?: number
  subItems?: { icon: React.ElementType; label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "#",
  },
  {
    icon: MessageSquare,
    label: "Sources",
    href: "#",
    subItems: [
      { icon: MessageSquare, label: "WhatsApp", href: "#" },
      { icon: Mail, label: "Mail", href: "#" },
    ],
  },
  {
    icon: Settings,
    label: "Preferences",
    href: "#",
  },
  {
    icon: Archive,
    label: "Archived",
    href: "#",
    badge: 12,
  },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const handleItemClick = (label: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      setExpandedItem(expandedItem === label ? null : label)
    } else {
      setActiveItem(label)
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col border-r border-border bg-sidebar transition-all duration-200 hover:w-56 group">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">RM</span>
        </div>
        <span className="ml-3 overflow-hidden whitespace-nowrap text-sm font-semibold text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Remember Me
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => handleItemClick(item.label, !!item.subItems)}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                activeItem === item.label
                  ? "bg-sidebar-accent text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="ml-3 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto overflow-hidden rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {item.badge}
                </span>
              )}
              {item.subItems && (
                <ChevronRight
                  className={cn(
                    "ml-auto h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100",
                    expandedItem === item.label && "rotate-90"
                  )}
                />
              )}
            </button>

            {/* Sub Items */}
            {item.subItems && expandedItem === item.label && (
              <div className="ml-4 mt-1 space-y-1 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.label}
                    onClick={() => setActiveItem(subItem.label)}
                    className={cn(
                      "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                      activeItem === subItem.label
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <subItem.icon className="h-4 w-4" />
                    <span className="ml-3">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-2">
        <button className="flex w-full items-center rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
            JD
          </div>
          <div className="ml-3 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="whitespace-nowrap text-sm font-medium text-foreground">
              John Doe
            </p>
            <p className="whitespace-nowrap text-xs text-muted-foreground">
              Pro Plan
            </p>
          </div>
        </button>
      </div>
    </aside>
  )
}
