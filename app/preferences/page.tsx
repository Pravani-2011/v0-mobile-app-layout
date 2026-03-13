"use client"

import { useState, useEffect } from "react"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { MobileHeader } from "@/components/dashboard/mobile-header"
import { Check, Search, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Company {
  id: string
  name: string
  category: string
}

const techCompanies: Company[] = [
  { id: "google", name: "Google", category: "Big Tech" },
  { id: "apple", name: "Apple", category: "Big Tech" },
  { id: "meta", name: "Meta", category: "Big Tech" },
  { id: "amazon", name: "Amazon", category: "Big Tech" },
  { id: "microsoft", name: "Microsoft", category: "Big Tech" },
  { id: "netflix", name: "Netflix", category: "Big Tech" },
  { id: "salesforce", name: "Salesforce", category: "Enterprise" },
  { id: "oracle", name: "Oracle", category: "Enterprise" },
  { id: "nvidia", name: "NVIDIA", category: "Chips" },
  { id: "amd", name: "AMD", category: "Chips" },
  { id: "intel", name: "Intel", category: "Chips" },
  { id: "stripe", name: "Stripe", category: "Fintech" },
  { id: "paypal", name: "PayPal", category: "Fintech" },
  { id: "coinbase", name: "Coinbase", category: "Fintech" },
  { id: "tesla", name: "Tesla", category: "Growth" },
  { id: "uber", name: "Uber", category: "Growth" },
  { id: "airbnb", name: "Airbnb", category: "Growth" },
  { id: "spotify", name: "Spotify", category: "Growth" },
]

const categories = ["All", "Big Tech", "Enterprise", "Chips", "Fintech", "Growth"]

export default function PreferencesPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    const stored = localStorage.getItem("chattrack_keywords")
    if (stored) {
      setSelectedCompanies(JSON.parse(stored))
    }
  }, [])

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies((prev) => {
      const updated = prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
      localStorage.setItem("chattrack_keywords", JSON.stringify(updated))
      return updated
    })
  }

  const filteredCompanies = techCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || company.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MobileHeader />

      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track companies for notifications
          </p>
        </div>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-card p-3">
          <Building2 className="h-4 w-4 text-primary" />
          <span className="text-sm">
            <span className="font-semibold">{selectedCompanies.length}</span>
            <span className="text-muted-foreground"> / {techCompanies.length} companies</span>
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Tabs - Horizontal Scroll */}
        <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 gap-2">
          {filteredCompanies.map((company) => {
            const isSelected = selectedCompanies.includes(company.id)
            return (
              <button
                key={company.id}
                onClick={() => toggleCompany(company.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border p-3 text-left transition-all active:scale-[0.98]",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {company.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {company.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{company.category}</p>
                </div>
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
              </button>
            )
          })}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Building2 className="mb-4 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No companies found</p>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  )
}
