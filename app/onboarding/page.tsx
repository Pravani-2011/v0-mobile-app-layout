"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, GraduationCap, Calendar, ChevronLeft, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfile {
  fullName: string
  dateOfBirth: string
  education: string
  degree: string
  institution: string
  graduationYear: string
}

const educationLevels = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
]

const degrees = [
  "Computer Science",
  "Information Technology",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Commerce",
  "Arts",
  "Science",
  "Other",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    dateOfBirth: "",
    education: "",
    degree: "",
    institution: "",
    graduationYear: "",
  })
  const [errors, setErrors] = useState<Partial<UserProfile>>({})

  const validateStep = () => {
    const newErrors: Partial<UserProfile> = {}

    if (step === 1) {
      if (!profile.fullName.trim()) newErrors.fullName = "Name is required"
      if (!profile.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    } else if (step === 2) {
      if (!profile.education) newErrors.education = "Please select your education level"
      if (!profile.degree) newErrors.degree = "Please select your field of study"
    } else if (step === 3) {
      if (!profile.institution.trim()) newErrors.institution = "Institution name is required"
      if (!profile.graduationYear) newErrors.graduationYear = "Graduation year is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep()) return

    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    // Save profile to localStorage
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("chattrack_profile", JSON.stringify(profile))
    setIsLoading(false)
    router.push("/")
  }

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-foreground">Complete Your Profile</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s <= step ? "bg-primary" : "bg-secondary"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-4">
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-center text-xl font-bold text-foreground">Personal Details</h2>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Tell us a bit about yourself
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => updateProfile("fullName", e.target.value)}
                placeholder="Enter your full name"
                className={cn(
                  "w-full rounded-xl border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1",
                  errors.fullName
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "border-border focus:border-primary focus:ring-primary"
                )}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Date of Birth
              </label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => updateProfile("dateOfBirth", e.target.value)}
                className={cn(
                  "w-full rounded-xl border bg-input px-4 py-3 text-foreground focus:outline-none focus:ring-1",
                  errors.dateOfBirth
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "border-border focus:border-primary focus:ring-primary"
                )}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-xs text-destructive">{errors.dateOfBirth}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Education Level */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-3/20">
                <GraduationCap className="h-8 w-8 text-chart-3" />
              </div>
              <h2 className="text-center text-xl font-bold text-foreground">Education</h2>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Your educational background
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Highest Education Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {educationLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => updateProfile("education", level)}
                    className={cn(
                      "rounded-xl border p-3 text-sm font-medium transition-all active:scale-[0.98]",
                      profile.education === level
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {errors.education && (
                <p className="mt-2 text-xs text-destructive">{errors.education}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Field of Study / Degree
              </label>
              <div className="grid grid-cols-2 gap-2">
                {degrees.map((degree) => (
                  <button
                    key={degree}
                    onClick={() => updateProfile("degree", degree)}
                    className={cn(
                      "rounded-xl border p-3 text-sm font-medium transition-all active:scale-[0.98]",
                      profile.degree === degree
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground"
                    )}
                  >
                    {degree}
                  </button>
                ))}
              </div>
              {errors.degree && (
                <p className="mt-2 text-xs text-destructive">{errors.degree}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Institution Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-4/20">
                <Calendar className="h-8 w-8 text-chart-4" />
              </div>
              <h2 className="text-center text-xl font-bold text-foreground">Institution</h2>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Where did you study?
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Institution / University Name
              </label>
              <input
                type="text"
                value={profile.institution}
                onChange={(e) => updateProfile("institution", e.target.value)}
                placeholder="e.g., IIT Delhi, Stanford University"
                className={cn(
                  "w-full rounded-xl border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1",
                  errors.institution
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "border-border focus:border-primary focus:ring-primary"
                )}
              />
              {errors.institution && (
                <p className="mt-1 text-xs text-destructive">{errors.institution}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Graduation Year
              </label>
              <select
                value={profile.graduationYear}
                onChange={(e) => updateProfile("graduationYear", e.target.value)}
                className={cn(
                  "w-full rounded-xl border bg-input px-4 py-3 text-foreground focus:outline-none focus:ring-1",
                  errors.graduationYear
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "border-border focus:border-primary focus:ring-primary"
                )}
              >
                <option value="">Select year</option>
                {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + 5 - i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              {errors.graduationYear && (
                <p className="mt-1 text-xs text-destructive">{errors.graduationYear}</p>
              )}
            </div>

            {/* Summary Preview */}
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                Profile Summary
              </p>
              <div className="space-y-1 text-sm text-foreground">
                <p><span className="text-muted-foreground">Name:</span> {profile.fullName}</p>
                <p><span className="text-muted-foreground">DOB:</span> {profile.dateOfBirth}</p>
                <p><span className="text-muted-foreground">Education:</span> {profile.education}</p>
                <p><span className="text-muted-foreground">Field:</span> {profile.degree}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          ) : step === 3 ? (
            <>
              <Check className="h-4 w-4" />
              Continue
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
