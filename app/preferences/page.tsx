"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { Check, Search, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Company {
  id: string
  name: string
  category: string
}

const techCompanies: Company[] = [
  // FAANG & Big Tech
  { id: "google", name: "Google", category: "Big Tech" },
  { id: "apple", name: "Apple", category: "Big Tech" },
  { id: "meta", name: "Meta", category: "Big Tech" },
  { id: "amazon", name: "Amazon", category: "Big Tech" },
  { id: "microsoft", name: "Microsoft", category: "Big Tech" },
  { id: "netflix", name: "Netflix", category: "Big Tech" },
  // Cloud & Enterprise
  { id: "salesforce", name: "Salesforce", category: "Cloud & Enterprise" },
  { id: "oracle", name: "Oracle", category: "Cloud & Enterprise" },
  { id: "ibm", name: "IBM", category: "Cloud & Enterprise" },
  { id: "sap", name: "SAP", category: "Cloud & Enterprise" },
  { id: "vmware", name: "VMware", category: "Cloud & Enterprise" },
  { id: "servicenow", name: "ServiceNow", category: "Cloud & Enterprise" },
  // Semiconductors
  { id: "nvidia", name: "NVIDIA", category: "Semiconductors" },
  { id: "amd", name: "AMD", category: "Semiconductors" },
  { id: "intel", name: "Intel", category: "Semiconductors" },
  { id: "qualcomm", name: "Qualcomm", category: "Semiconductors" },
  { id: "tsmc", name: "TSMC", category: "Semiconductors" },
  { id: "broadcom", name: "Broadcom", category: "Semiconductors" },
  // Fintech & Payments
  { id: "stripe", name: "Stripe", category: "Fintech" },
  { id: "paypal", name: "PayPal", category: "Fintech" },
  { id: "square", name: "Square", category: "Fintech" },
  { id: "visa", name: "Visa", category: "Fintech" },
  { id: "mastercard", name: "Mastercard", category: "Fintech" },
  { id: "coinbase", name: "Coinbase", category: "Fintech" },
  // High-Growth Tech
  { id: "tesla", name: "Tesla", category: "High-Growth" },
  { id: "uber", name: "Uber", category: "High-Growth" },
  { id: "airbnb", name: "Airbnb", category: "High-Growth" },
  { id: "spotify", name: "Spotify", category: "High-Growth" },
  { id: "shopify", name: "Shopify", category: "High-Growth" },
  { id: "snowflake", name: "Snowflake", category: "High-Growth" },
  // Social & Communication
  { id: "linkedin", name: "LinkedIn", category: "Social" },
  { id: "twitter", name: "X (Twitter)", category: "Social" },
  { id: "snap", name: "Snap Inc.", category: "Social" },
  { id: "discord", name: "Discord", category: "Social" },
  { id: "slack", name: "Slack", category: "Social" },
  { id: "zoom", name: "Zoom", category: "Social" },
]

const categories = ["All", "Big Tech", "Cloud & Enterprise", "Semiconductors", "Fintech", "High-Growth", "Social"]

export default function PreferencesPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    const stored = localStorage.getItem("rememberme_keywords")
    if (stored) {
      setSelectedCompanies(JSON.parse(stored))
    }
  }, [])

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies((prev) => {
      const updated = prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
      localStorage.setItem("rememberme_keywords", JSON.stringify(updated))
      return updated
    })
  }

  const selectAll = () => {
    const allIds = filteredCompanies.map((c) => c.id)
    const newSelected = [...new Set([...selectedCompanies, ...allIds])]
    setSelectedCompanies(newSelected)
    localStorage.setItem("rememberme_keywords", JSON.stringify(newSelected))
  }

  const clearAll = () => {
    if (activeCategory === "All") {
      setSelectedCompanies([])
      localStorage.setItem("rememberme_keywords", JSON.stringify([]))
    } else {
      const categoryIds = filteredCompanies.map((c) => c.id)
      const newSelected = selectedCompanies.filter((id) => !categoryIds.includes(id))
      setSelectedCompanies(newSelected)
      localStorage.setItem("rememberme_keywords", JSON.stringify(newSelected))
    }
  }

  const filteredCompanies = techCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || company.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const groupedCompanies = filteredCompanies.reduce((acc, company) => {
    if (!acc[company.category]) {
      acc[company.category] = []
    }
    acc[company.category].push(company)
    return acc
  }, {} as Record<string, Company[]>)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="pl-16">
        <TopNav />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Preferences
            </h1>
            <p className="mt-1 text-muted-foreground">
              Select companies to track. These keywords will categorize your WhatsApp and Gmail notifications.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mb-6 flex items-center gap-6 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{selectedCompanies.length}</span> companies selected
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{techCompanies.length}</span> available
            </span>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="rounded-lg border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Companies Grid */}
          <div className="space-y-8">
            {activeCategory === "All" ? (
              Object.entries(groupedCompanies).map(([category, companies]) => (
                <div key={category}>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {category}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {companies.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        isSelected={selectedCompanies.includes(company.id)}
                        onToggle={() => toggleCompany(company.id)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    isSelected={selectedCompanies.includes(company.id)}
                    onToggle={() => toggleCompany(company.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No companies found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function CompanyCard({
  company,
  isSelected,
  onToggle,
}: {
  company: Company
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
        )}
      >
        {company.name.substring(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium",
            isSelected ? "text-foreground" : "text-foreground"
          )}
        >
          {company.name}
        </p>
        <p className="text-xs text-muted-foreground">{company.category}</p>
      </div>
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          isSelected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30 group-hover:border-primary/50"
        )}
      >
        {isSelected && <Check className="h-3 w-3" />}
      </div>
    </button>
  )
}
