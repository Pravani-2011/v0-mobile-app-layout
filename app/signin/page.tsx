"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, Eye, EyeOff, ArrowRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type AuthMethod = "email" | "phone" | "google"

export default function SignInPage() {
  const router = useRouter()
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [showPassword, setShowPassword] = useState(false)
  const [showOtpScreen, setShowOtpScreen] = useState(false)
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1500))
    localStorage.setItem("chattrack_auth", JSON.stringify({ email: "user@gmail.com", method: "google" }))
    setIsLoading(false)
    router.push("/onboarding")
  }

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number")
      return
    }
    setIsLoading(true)
    setError("")
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setShowOtpScreen(true)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter complete OTP")
      return
    }
    setIsLoading(true)
    setError("")
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("chattrack_auth", JSON.stringify({ phone, method: "phone" }))
    setIsLoading(false)
    router.push("/onboarding")
  }

  const handleBack = () => {
    if (showOtpScreen) {
      setShowOtpScreen(false)
      setOtp(["", "", "", "", "", ""])
    } else if (authMethod) {
      setAuthMethod(null)
      setError("")
    }
  }

  // OTP Screen
  if (showOtpScreen) {
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
          <h1 className="text-lg font-semibold text-foreground">Verify OTP</h1>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Enter verification code</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We sent a 6-digit code to +91 {phone}
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="mb-6 flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="h-12 w-12 rounded-lg border border-border bg-input text-center text-lg font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            ))}
          </div>

          {error && (
            <p className="mb-4 text-center text-sm text-destructive">{error}</p>
          )}

          <button
            onClick={handleVerifyOtp}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>
                Verify & Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <button className="mt-4 w-full text-center text-sm text-primary">
            Resend code
          </button>
        </div>
      </div>
    )
  }

  // Email/Password Form
  if (authMethod === "email") {
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

  // Phone Number Form
  if (authMethod === "phone") {
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
          <h1 className="text-lg font-semibold text-foreground">Sign in with Phone</h1>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground">Enter your phone</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We will send you a verification code
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Phone number
            </label>
            <div className="flex gap-2">
              <div className="flex h-12 w-16 items-center justify-center rounded-xl border border-border bg-input text-sm font-medium text-foreground">
                +91
              </div>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Enter 10-digit number"
                className="flex-1 rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}

          <button
            onClick={handleSendOtp}
            disabled={isLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>
                Send OTP
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Main Sign In Options
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
            onClick={() => setAuthMethod("email")}
            className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Continue with Email</p>
              <p className="text-sm text-muted-foreground">Sign in with your email</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Phone Sign In */}
          <button
            onClick={() => setAuthMethod("phone")}
            className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/20">
              <Phone className="h-5 w-5 text-chart-3" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Continue with Phone</p>
              <p className="text-sm text-muted-foreground">We will send you an OTP</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Continue with Google</p>
              <p className="text-sm text-muted-foreground">Use your Google account</p>
            </div>
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            ) : (
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            )}
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
