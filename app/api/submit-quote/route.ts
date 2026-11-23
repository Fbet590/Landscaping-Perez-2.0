import { NextResponse } from "next/server"
import { promises as dns } from "node:dns"
import { normalizePhone, validateEmail, validateName, validatePhone } from "@/lib/validation"
import { isBudgetOption, isFlexibilityOption, isMultipleBidsOption } from "@/lib/lead-form"

export const runtime = "nodejs"

const PROJECT_DETAILS = "Options: Turf, Pavers, Gravel, Plants\nBudget: $7,000 - $10,000"

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/5xmJQ9GnZ2epwQjXcomF/webhook-trigger/9d489a0c-0683-4cb0-b02e-51fbeb0cc70b"

const MIN_FILL_TIME_MS = 3000
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const DNS_TIMEOUT_MS = 3000

// Best effort only: serverless instances don't share memory, so this slows
// repeat abuse from one client but is not a hard global limit.
const recentSubmissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  recentSubmissions.set(ip, recent)
  if (recentSubmissions.size > 5000) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentSubmissions.delete(key)
    }
  }
  return recent.length > RATE_LIMIT_MAX
}

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(Object.assign(new Error("timeout"), { code: "ETIMEOUT" })), DNS_TIMEOUT_MS)),
  ])
}

// True unless DNS positively says the domain cannot receive mail. Lookup
// failures (timeouts, resolver errors) are treated as "unknown" so a flaky
// resolver never blocks a real customer.
async function domainCanReceiveMail(domain: string): Promise<boolean> {
  const missing = new Set(["ENOTFOUND", "ENODATA"])
  try {
    const mx = await withTimeout(dns.resolveMx(domain))
    if (mx.length > 0) return true
  } catch (error) {
    if (!missing.has((error as NodeJS.ErrnoException).code ?? "")) return true
  }
  try {
    const addresses = await withTimeout(dns.resolve4(domain))
    return addresses.length > 0
  } catch (error) {
    return !missing.has((error as NodeJS.ErrnoException).code ?? "")
  }
}

function invalid(field: "budget" | "flexibility" | "name" | "email" | "phone", error: string) {
  return NextResponse.json({ error, field }, { status: 400 })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 })
    }

    // Bots fill the hidden field or submit faster than a person can. Answer
    // with success so they don't learn what tripped the check; nothing is forwarded.
    const honeypotFilled = typeof body.website === "string" && body.website.trim() !== ""
    const tooFast = typeof body.elapsedMs !== "number" || body.elapsedMs < MIN_FILL_TIME_MS
    if (honeypotFilled || tooFast) {
      return NextResponse.json({ success: true })
    }

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const rawPhone = typeof body.phone === "string" ? body.phone : ""

    if (!isBudgetOption(body.budget)) return invalid("budget", "Please select a budget range")
    if (!isFlexibilityOption(body.flexibility)) {
      return invalid("flexibility", "Please select a flexibility option")
    }

    const nameError = validateName(name)
    if (nameError) return invalid("name", nameError)
    const emailError = validateEmail(email)
    if (emailError) return invalid("email", emailError)
    const phoneError = validatePhone(rawPhone)
    if (phoneError) return invalid("phone", phoneError)

    if (!isMultipleBidsOption(body.multipleBids)) {
      return NextResponse.json({ error: "Please choose a bid preference" }, { status: 400 })
    }

    const emailDomain = email.split("@")[1].toLowerCase()
    if (!(await domainCanReceiveMail(emailDomain))) {
      return invalid("email", "That email domain doesn't look real. Please check it and try again")
    }

    const digits = normalizePhone(rawPhone) as string
    const [firstName, ...rest] = name.split(/\s+/)

    const payload = {
      first_name: firstName,
      last_name: rest.join(" "),
      full_name: name,
      name,
      email,
      phone: `+1${digits}`,
      budget: body.budget,
      flexibility: body.flexibility,
      multipleBids: body.multipleBids,
      projectDetails: PROJECT_DETAILS,
      source: "Landscaping Perez - $7,000 Package",
      tags: ["$7,000 Package Inquiry", "Website Lead"],
    }

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Webhook failed with status:", response.status)
      return NextResponse.json({ error: "Failed to submit" }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting to webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
