"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Send, Check, CalendarCheck, Clock, MapPin } from "lucide-react"
import { trackFBEvent } from "./facebook-pixel"

const totalSteps = 3

export function Hero() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  function canAdvance() {
    switch (step) {
      case 0: return name.trim() !== ""
      case 1: return email.trim() !== ""
      case 2: return phone.trim() !== ""
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
          projects: ["$7,000 Flat-Rate Package Inquiry"],
          budget: "$7,000",
          flexibility: "N/A",
          name,
          email,
          phone,
        }),
      })

      if (res.ok) {
        try {
          trackFBEvent("Lead", {
            content_name: "Eligibility Check",
            content_category: "$7,000 Package",
            value: "$7,000",
          })
        } catch {}
        alert("Thank you! We'll be in touch soon.")
        setStep(0)
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
        0: "Please enter your name",
        1: "Please enter a valid email address",
        2: "Please enter your phone number",
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
          <h1 className="text-balance font-serif font-extrabold leading-tight text-background" style={{ fontSize: "50px" }}>
            Skip the Quotes. Know the Price. <br /> Build the Backyard You Want.
          </h1>
          <p className="mt-3 font-medium text-background/90" style={{ fontSize: "28px" }}>
            Premium Turf, Phoenix Pavers, Decorative gravel, and Curated plants.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#85BF23" }}>
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <span className="font-medium text-background" style={{ fontSize: "24px" }}>Artificial Turf Installation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#85BF23" }}>
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <span className="font-medium text-background" style={{ fontSize: "24px" }}>Pavers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#85BF23" }}>
                <Check className="size-3 text-white" strokeWidth={3} />
              </span>
              <span className="font-medium text-background" style={{ fontSize: "24px" }}>Full Backyard Remodels</span>
            </div>
          </div>
          <a
            href="#quote"
            className="mt-6 inline-block rounded-md px-6 py-3 font-semibold uppercase text-primary-foreground transition-colors hover:opacity-90"
            style={{ backgroundColor: "#85BF23", fontSize: "24px" }}
          >
            CHECK MY ELIGIBILITY →
          </a>
        </div>

        {/* Form section with package info */}
        <div className="flex w-full max-w-sm flex-col gap-4">
          {/* $7,000 Package Info Card */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#f5f9f0", border: "1px solid #d4e8c2" }}>
            <h2 className="font-bold text-foreground" style={{ fontSize: "28px" }}>
              See If Your Yard Qualifies for Our $7,000 Flat-Rate Package
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed" style={{ fontSize: "24px" }}>
              Our $7,000 backyard package is designed for yards that fit specific dimensions. Fill out the form below and we&apos;ll let you know if your yard qualifies and what your options are!
            </p>
            
            <div className="mt-4 rounded-xl bg-white p-4" style={{ border: "1px solid #e5edd9" }}>
              <p className="font-semibold text-foreground mb-3" style={{ fontSize: "24px" }}>
                {"What's Included in the $7,000 Package:"}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 shrink-0" style={{ color: "#85BF23" }} />
                  <span className="text-foreground" style={{ fontSize: "24px" }}>300 sq ft Premium 104oz Turf — the highest quality artificial grass on the market</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 shrink-0" style={{ color: "#85BF23" }} />
                  <span className="text-foreground" style={{ fontSize: "24px" }}>300 sq ft Phoenix Pavers</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 shrink-0" style={{ color: "#85BF23" }} />
                  <span className="text-foreground" style={{ fontSize: "24px" }}>10 Tons Decorative Gravel</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 shrink-0" style={{ color: "#85BF23" }} />
                  <span className="text-foreground" style={{ fontSize: "24px" }}>10 Plants (5 Gallon Each)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-step form */}
          <div
            className="w-full overflow-hidden rounded-2xl bg-background shadow-2xl"
            style={{ border: "2.5px solid #85BF23" }}
          >
            {!mounted ? (
              <div className="p-6">
                <div className="flex h-48 items-center justify-center">
                  <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
                </div>
              </div>
            ) : (
            <div className="p-6">
              {/* Step indicator */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-medium uppercase tracking-widest text-muted-foreground" style={{ fontSize: "22px" }}>
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

              {/* Step 0: Name */}
              {step === 0 && (
                <>
                  <h3 className="font-bold text-foreground" style={{ fontSize: "26px" }}>
                    {"What's your name?"}
                  </h3>
                  <p className="mt-1 text-muted-foreground" style={{ fontSize: "22px" }}>
                    {"So we know who we're speaking with"}
                  </p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="mt-5 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                    style={{ fontSize: "24px" }}
                  />
                  {errors[0] && (
                    <p className="mt-2 font-medium text-red-500" style={{ fontSize: "22px" }}>{errors[0]}</p>
                  )}
                </>
              )}

              {/* Step 1: Email */}
              {step === 1 && (
                <>
                  <h3 className="font-bold text-foreground" style={{ fontSize: "26px" }}>
                    {"What's your email address?"}
                  </h3>
                  <p className="mt-1 text-muted-foreground" style={{ fontSize: "22px" }}>
                    {"We'll send your eligibility details here"}
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-5 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                    style={{ fontSize: "24px" }}
                  />
                  {errors[1] && (
                    <p className="mt-2 font-medium text-red-500" style={{ fontSize: "22px" }}>{errors[1]}</p>
                  )}
                </>
              )}

              {/* Step 2: Phone */}
              {step === 2 && (
                <>
                  <h3 className="font-bold text-foreground" style={{ fontSize: "26px" }}>
                    {"Best number to reach you?"}
                  </h3>
                  <p className="mt-1 text-muted-foreground" style={{ fontSize: "22px" }}>
                    {"For a quick follow-up about your eligibility"}
                  </p>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-5 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                    style={{ fontSize: "24px" }}
                  />
                  {errors[2] && (
                    <p className="mt-2 font-medium text-red-500" style={{ fontSize: "22px" }}>{errors[2]}</p>
                  )}
                </>
              )}

              {/* Navigation */}
              <div className={`mt-6 flex gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
                {step > 0 && (
                  <button
                    onClick={() => { setErrors({}); setStep(step - 1) }}
                    className="flex items-center gap-1 rounded-xl border-2 border-border px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-muted"
                    style={{ fontSize: "24px" }}
                  >
                    <ChevronLeft className="size-4" />
                    Back
                  </button>
                )}
                {step < 2 ? (
                  <button
                    onClick={validateAndAdvance}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-primary-foreground transition-all hover:opacity-90"
                    style={{ backgroundColor: "#85BF23", fontSize: "24px" }}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                ) : (
                  <button
                    onClick={validateAndSubmit}
                    disabled={isSubmitting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wide text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: "#85BF23", fontSize: "24px" }}
                  >
                    {isSubmitting ? "Submitting..." : "Check Eligibility"}
                    {!isSubmitting && <Send className="size-4" />}
                  </button>
                )}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative border-t border-white/10 bg-foreground/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 py-4 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/20">
          <div className="flex items-center gap-2.5 sm:px-8">
            <CalendarCheck className="size-5 shrink-0" style={{ color: "#C9A84C" }} />
            <span className="font-medium" style={{ color: "#b0b0b0", fontSize: "24px" }}>0% Down Financing</span>
          </div>
          <div className="flex items-center gap-2.5 sm:px-8">
            <Clock className="size-5 shrink-0" style={{ color: "#C9A84C" }} />
            <span className="font-medium" style={{ color: "#b0b0b0", fontSize: "24px" }}>Since 2000</span>
          </div>
          <div className="flex items-center gap-2.5 sm:px-8">
            <MapPin className="size-5 shrink-0" style={{ color: "#C9A84C" }} />
            <span className="font-medium" style={{ color: "#b0b0b0", fontSize: "24px" }}>All Phoenix & Surrounding Cities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
