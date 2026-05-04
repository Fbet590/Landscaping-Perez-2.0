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

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/5xmJQ9GnZ2epwQjXcomF/webhook-trigger/9d489a0c-0683-4cb0-b02e-51fbeb0cc70b"

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
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
