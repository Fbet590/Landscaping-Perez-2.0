export const MULTIPLE_BIDS_OPTIONS = [
  "Yes (Multiple bids is better)",
  "No, I only want a bid from 1 company",
] as const

export type MultipleBidsOption = (typeof MULTIPLE_BIDS_OPTIONS)[number]

export function isMultipleBidsOption(value: unknown): value is MultipleBidsOption {
  return typeof value === "string" && (MULTIPLE_BIDS_OPTIONS as readonly string[]).includes(value)
}

export type ProjectAnswer = {
  label: string
  value: string | string[] | null | undefined
}

// Joins project answers in the order given, one "Label: value" line each.
// Empty answers are dropped so a label never appears without a value.
export function buildProjectDetails(answers: ProjectAnswer[]): string {
  return answers
    .map(({ label, value }) => {
      const text = Array.isArray(value)
        ? value.map((v) => String(v).trim()).filter(Boolean).join(", ")
        : (value ?? "").toString().trim()
      return text ? `${label}: ${text}` : ""
    })
    .filter(Boolean)
    .join("\n")
}
