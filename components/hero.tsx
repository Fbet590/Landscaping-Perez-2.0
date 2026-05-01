"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Send, Check, CalendarCheck, Clock, MapPin } from "lucide-react"
import { trackFBEvent } from "./facebook-pixel"

const projectOptions = [
  { id: "turf", label: "Turf Installation", icon: "T" },
  { id: "pavers", label: "Pavers (patio, walkway, or driveway)", icon: "P" },
  { id: "concrete", label: "Concrete/Patio Extension/Driveway", icon: "C" },
  { id: "remodel", label: "Full Backyard Remodel", icon: "R" },
]

const budgetOptions = [
  "$10,000 - $15,000",
  "$15,000 - $25,000",
  "$25,000 - $40,000",
  "$40,000 +",
]

const flexibilityOptions = [
  "Yes, I prefer premium quality even if the cost increases slightly",
  "Maybe, depends on the options presented",
  "No, I have a fixed budget",
]

const totalSteps = 6

export function Hero() {
  const [step, setStep] = useState(0)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [selectedBudget, setSelectedBudget] = useState("")
  const [selectedFlexibility, setSelectedFlexibility] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  function toggleProject(id: string) {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  function canAdvance() {
    switch (step) {
      case 0: return selectedProjects.length > 0
      case 1: return selectedBudget !== ""
      case 2: return selectedFlexibility !== ""
      case 3: return name.trim() !== ""
      case 4: return email.trim() !== ""
      case 5: return phone.trim() !== ""
      default: return false
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: selectedProjects,
          budget: selectedBudget,
          flexibility: selectedFlexibility,
          name,
          email,
          phone,
        }),
      })

      if (res.ok) {
        try {
          trackFBEvent("Lead", {
            content_name: "Quote Request",
            content_category: selectedProjects.join(", "),
            value: selectedBudget,
          })
        } catch {}
        alert("Thank you! We'll be in touch soon.")
        setStep(0)
        setSelectedProjects([])
        setSelectedBudget("")
        setSelectedFlexibility("")
        setName("")
        setEmail("")
        setPhone("")
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [errors, setErrors] = useState<Record<number, string>>({})

  function validateAndAdvance() {
    if (!canAdvance()) {
      const messages: Record<number, string> = {
        0: "Please select at least one project type",
        1: "Please select a budget range",
        2: "Please select a flexibility option",
        3: "Please enter your name",
        4: "Please enter a valid email address",
        5: "Please enter your phone number",
      }
      setErrors({ [step]: messages[step] })
      return
    }
    setErrors({})
    setStep(step + 1)
  }

  function validateAndSubmit() {
    if (!canAdvance()) {
      setErrors({ [step]: "Please enter your phone number" })
      return
    }
    setErrors({})
    handleSubmit()
  }

  return (
    <section id="quote" className="relative min-h-[600px] pt-[72px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-backyard.jpg"
          alt="Beautiful backyard with lush green turf and covered patio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/55" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="max-w-xl">
          <h1 className="text-balance font-serif font-extrabold leading-tight text-background" style={{ fontSize: "40px" }}>
            Unlock Stunning Outdoor Spaces with Our Expert Design & Installation
          </h1>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#85BF23" }}>
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-background">Artificial Turf Installation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#85BF23" }}>
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-background">Pavers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#85BF23" }}>
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-background">Full Backyard Remodels</span>
            </div>
          </div>
          <a
            href="#quote"
            className="mt-6 inline-block rounded-md px-6 py-3 text-sm font-semibold uppercase text-primary-foreground transition-colors hover:opacity-90"
            style={{ backgroundColor: "#85BF23" }}
          >
            GET A QUOTE
          </a>
        </div>

        {/* Multi-step form */}
        <div
          className="w-full max-w-sm overflow-hidden rounded-2xl bg-background shadow-2xl"
          style={{ border: "2.5px solid #85BF23" }}
        >
          {!mounted ? (
            <div className="p-6">
              <div className="flex h-64 items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
              </div>
            </div>
          ) : (
          <div className="p-6">
            {/* Step indicator */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Step {step + 1} of {totalSteps}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-5 rounded-full transition-colors ${
                      i <= step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 0: Project type */}
            {step === 0 && (
              <>
                <h3 className="text-base font-bold text-foreground">
                  What type of project are you planning?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Check all that apply
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {projectOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${
                        selectedProjects.includes(option.id)
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <Checkbox
                        checked={selectedProjects.includes(option.id)}
                        onCheckedChange={() => toggleProject(option.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors[0] && (
                  <p className="mt-2 text-xs font-medium text-red-500">{errors[0]}</p>
                )}
              </>
            )}

            {/* Step 1: Budget */}
            {step === 1 && (
              <>
                <h3 className="text-base font-bold text-foreground">
                  {"What's your approximate budget?"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select the range that fits your project
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedBudget(option)}
                      className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                        selectedBudget === option
                          ? "border-primary bg-primary/5 text-foreground shadow-sm"
                          : "border-border text-foreground hover:border-primary/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors[1] && (
                  <p className="mt-2 text-xs font-medium text-red-500">{errors[1]}</p>
                )}
              </>
            )}

            {/* Step 2: Flexibility */}
            {step === 2 && (
              <>
                <h3 className="text-base font-bold text-foreground">
                  Are you flexible with your budget?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  To guarantee premium-quality materials & workmanship
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {flexibilityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedFlexibility(option)}
                      className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                        selectedFlexibility === option
                          ? "border-primary bg-primary/5 text-foreground shadow-sm"
                          : "border-border text-foreground hover:border-primary/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors[2] && (
                  <p className="mt-2 text-xs font-medium text-red-500">{errors[2]}</p>
                )}
              </>
            )}

            {/* Step 3: Name */}
            {step === 3 && (
              <>
                <h3 className="text-base font-bold text-foreground">
                  {"What's your name?"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {"So we know who we're speaking with"}
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-5 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
                {errors[3] && (
                  <p className="mt-2 text-xs font-medium text-red-500">{errors[3]}</p>
                )}
              </>
            )}

            {/* Step 4: Email */}
            {step === 4 && (
              <>
                <h3 className="text-base font-bold text-foreground">
                  {"What's your email address?"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {"We'll send your quote details here"}
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-5 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
                {errors[4] && (
                  <p className="mt-2 text-xs font-medium text-red-500">{errors[4]}</p>
                )}
              </>
            )}

            {/* Step 5: Phone */}
            {step === 5 && (
              <>
                <h3 className="text-base font-bold text-foreground">
                  {"Best number to reach you?"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {"For a quick follow-up about your project"}
                </p>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-5 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
                {errors[5] && (
                  <p className="mt-2 text-xs font-medium text-red-500">{errors[5]}</p>
                )}
              </>
            )}

            {/* Navigation */}
            <div className={`mt-6 flex gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
              {step > 0 && (
                <button
                  onClick={() => { setErrors({}); setStep(step - 1) }}
                  className="flex items-center gap-1 rounded-xl border-2 border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronLeft className="size-4" />
                  Back
                </button>
              )}
              {step < 5 ? (
                <button
                  onClick={validateAndAdvance}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:opacity-90"
                  style={{ backgroundColor: "#85BF23" }}
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              ) : (
                <button
                  onClick={validateAndSubmit}
                  disabled={isSubmitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: "#85BF23" }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  {!isSubmitting && <Send className="size-4" />}
                </button>
              )}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative border-t border-white/10 bg-foreground/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 py-4 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/20">
          <div className="flex items-center gap-2.5 sm:px-8">
            <CalendarCheck className="size-5 shrink-0" style={{ color: "#C9A84C" }} />
            <span className="text-sm font-medium" style={{ color: "#b0b0b0" }}>0% Down Financing</span>
          </div>
          <div className="flex items-center gap-2.5 sm:px-8">
            <Clock className="size-5 shrink-0" style={{ color: "#C9A84C" }} />
            <span className="text-sm font-medium" style={{ color: "#b0b0b0" }}>Since 2000</span>
          </div>
          <div className="flex items-center gap-2.5 sm:px-8">
            <MapPin className="size-5 shrink-0" style={{ color: "#C9A84C" }} />
            <span className="text-sm font-medium" style={{ color: "#b0b0b0" }}>All Phoenix & Surrounding Cities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
