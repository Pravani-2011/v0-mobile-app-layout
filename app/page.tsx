import { MobileNav } from "@/components/dashboard/mobile-nav"
import { MobileHeader } from "@/components/dashboard/mobile-header"
import { MobileStatsCards } from "@/components/dashboard/mobile-stats-cards"
import { MobileLeadsList } from "@/components/dashboard/mobile-leads-list"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Content - with safe area padding */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here&apos;s an overview of your opportunities.
          </p>
        </div>

        {/* Quick Stats - Horizontal Scroll */}
        <section className="mb-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Quick Stats
          </h2>
          <MobileStatsCards />
        </section>

        {/* Recent Leads - Card List */}
        <section>
          <MobileLeadsList />
        </section>
      </main>

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
