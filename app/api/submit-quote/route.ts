import { NextResponse } from "next/server"
import { normalizePhone, validateEmail, validateName, validatePhone } from "@/lib/validation"

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/5xmJQ9GnZ2epwQjXcomF/webhook-trigger/9d489a0c-0683-4cb0-b02e-51fbeb0cc70b"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const rawPhone = typeof body.phone === "string" ? body.phone : ""

    const validationError = validateName(name) ?? validateEmail(email) ?? validatePhone(rawPhone)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
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
