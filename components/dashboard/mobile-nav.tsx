"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Bell,
  Activity,
  Settings,
  Plus,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
}

const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/",
  },
  {
    icon: Activity,
    label: "Activity",
    href: "/activity",
  },
  {
    icon: Plus,
    label: "Add",
    href: "#add",
  },
  {
    icon: Bell,
    label: "Alerts",
    href: "/notifications",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/preferences",
  },
]

export function MobileNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavClick = (item: NavItem) => {
    if (item.href && !item.href.startsWith("#")) {
      router.push(item.href)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isAddButton = item.label === "Add"

          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2",
                isAddButton
                  ? "relative -mt-4"
                  : isActive
                    ? "text-primary"
                    : "text-muted-foreground"
              )}
            >
              {isAddButton ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              ) : (
                <>
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
