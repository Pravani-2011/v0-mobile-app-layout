import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentLeads } from "@/components/dashboard/recent-leads"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

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

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Leads - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RecentLeads />
            </div>

            {/* Activity Feed - Takes 1 column */}
            <div>
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
