import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentLeads } from "@/components/dashboard/recent-leads"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="pl-16">
        <TopNav />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back! Here&apos;s an overview of your opportunities.
            </p>
          </div>

          {/* Quick Stats */}
          <section className="mb-8">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Quick Stats
            </h2>
            <StatsCards />
          </section>

          {/* Recent Leads - Full Width */}
          <section>
            <RecentLeads />
          </section>
        </main>
      </div>
    </div>
  )
}
