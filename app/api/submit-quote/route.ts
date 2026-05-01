import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload = {
      projects: body.projects,
      budget: body.budget,
      flexibility: body.flexibility,
      name: body.name,
      email: body.email,
      phone: body.phone,
      submitted_at: new Date().toISOString(),
      source: "Landscaping Perez Landing Page",
    }

    const webhookUrl = process.env.WEBHOOK_URL

    if (!webhookUrl) {
      console.warn("WEBHOOK_URL not set - lead data received but not forwarded:", payload)
      return NextResponse.json({ success: true, warning: "Webhook not configured" })
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Webhook responded with status:", response.status)
      return NextResponse.json(
        { error: "Failed to submit" },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting to webhook:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
