"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight, Eye, EyeOff, Phone, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  })
  const [error, setError] = useState("")

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

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      setError("Please enter a valid phone number")
      return
    }
    setError("")
    setIsLoading(true)
    
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setOtpSent(true)
    setIsLoading(false)
  }

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter the complete OTP")
      return
    }
    setError("")
    setIsLoading(true)
    
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const userData = {
      email: "",
      phone: formData.phone,
      name: formData.phone,
      initials: formData.phone.slice(-2),
    }
    localStorage.setItem("chattrack_user", JSON.stringify(userData))
    
    setIsLoading(false)
    router.push("/")
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const userData = {
      email: "user@gmail.com",
      name: "Google User",
      initials: "GU",
    }
    localStorage.setItem("chattrack_user", JSON.stringify(userData))
    
    setIsLoading(false)
    router.push("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (isSignUp && !formData.name) {
      setError("Please enter your name")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user data in localStorage for demo purposes
    const userData = {
      email: formData.email,
      name: isSignUp ? formData.name : formData.email.split("@")[0],
      initials: isSignUp
        ? formData.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : formData.email.slice(0, 2).toUpperCase(),
    }
    localStorage.setItem("chattrack_user", JSON.stringify(userData))

    setIsLoading(false)
    router.push("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <span className="text-xl font-bold text-primary-foreground">CT</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            ChatTrack
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp
              ? "Create an account to get started"
              : "Sign in to your account"}
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-input pl-10"
                  />
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <span className="text-sm">@</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-input pl-10"
                />
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-input pl-10 pr-10"
                />
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                "Please wait..."
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                }}
                className="ml-1 font-medium text-primary hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-3 border-border bg-transparent hover:bg-secondary"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
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
              Continue with Google
            </Button>

            {/* Phone Number Sign In */}
            <Button
              type="button"
              variant="outline"
              className="w-full gap-3 border-border bg-transparent hover:bg-secondary"
              onClick={() => setAuthMethod("phone")}
              disabled={isLoading}
            >
              <Phone className="h-5 w-5 text-muted-foreground" />
              Continue with Phone
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Phone OTP Modal */}
      {authMethod === "phone" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">
            <button
              type="button"
              onClick={() => {
                setAuthMethod("email")
                setOtpSent(false)
                setOtp(["", "", "", "", "", ""])
                setError("")
              }}
              className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <h2 className="mb-2 text-xl font-semibold text-foreground">
              {otpSent ? "Verify OTP" : "Enter Phone Number"}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {otpSent
                ? `We've sent a 6-digit code to ${formData.phone}`
                : "We'll send you a one-time password to verify"}
            </p>

            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-input pl-10"
                    />
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-3 block text-sm font-medium text-foreground">
                    Enter OTP
                  </label>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="h-12 w-12 bg-input text-center text-lg font-semibold"
                      />
                    ))}
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleVerifyOtp}
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Sign In"}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false)
                    setOtp(["", "", "", "", "", ""])
                  }}
                  className="w-full text-center text-sm text-muted-foreground hover:text-primary"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
