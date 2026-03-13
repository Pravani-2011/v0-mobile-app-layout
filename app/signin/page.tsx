"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Eye, EyeOff, ArrowRight, ChevronLeft } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setIsLoading(true)
    setError("")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("chattrack_auth", JSON.stringify({ email, method: "email" }))
    setIsLoading(false)
    router.push("/onboarding")
  }

  const handleBack = () => {
    if (showForm) {
      setShowForm(false)
      setError("")
    }
  }

  // Email/Password Form
  if (showForm) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Sign in with Email</h1>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}

          <button
            onClick={handleEmailSignIn}
            disabled={isLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Forgot your password?{" "}
            <button className="text-primary">Reset it</button>
          </p>
        </div>
      </div>
    )
  }

  // Main Sign In Screen
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Decorative Top */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10" />
        <div className="absolute -left-5 top-20 h-24 w-24 rounded-full bg-primary/10" />
      </div>

      <div className="flex-1 -mt-8 rounded-t-3xl bg-background px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome to ChatTrack</h1>
          <p className="mt-2 text-muted-foreground">
            Track opportunities and never miss a deadline
          </p>
        </div>

        <div className="space-y-3">
          {/* Email Sign In */}
          <button
            onClick={() => setShowForm(true)}
            className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Continue with Email</p>
              <p className="text-sm text-muted-foreground">Sign in with your email and password</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="text-primary">Terms of Service</span> and{" "}
          <span className="text-primary">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
