import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // LeadConnector expects these specific field names
    const payload = {
      first_name: body.name?.split(" ")[0] || body.name,
      last_name: body.name?.split(" ").slice(1).join(" ") || "",
      full_name: body.name,
      name: body.name,
      email: body.email,
      phone: body.phone,
      source: "Landscaping Perez - $7,000 Package",
      tags: ["$7,000 Package Inquiry", "Website Lead"],
    }

    const webhookUrl = process.env.WEBHOOK_URL

    console.log("[v0] Webhook URL:", webhookUrl)
    console.log("[v0] Payload being sent:", JSON.stringify(payload, null, 2))

    if (!webhookUrl) {
      console.warn("[v0] WEBHOOK_URL not set - lead data received but not forwarded:", payload)
      return NextResponse.json({ success: true, warning: "Webhook not configured" })
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const responseText = await response.text()
    console.log("[v0] Webhook response status:", response.status)
    console.log("[v0] Webhook response body:", responseText)

    if (!response.ok) {
      console.error("[v0] Webhook responded with error status:", response.status, responseText)
      return NextResponse.json(
        { error: "Failed to submit", details: responseText },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error submitting to webhook:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
