export const MULTIPLE_BIDS_OPTIONS = [
  "Yes (Multiple bids is better)",
  "No, I only want a bid from 1 company",
] as const

export const PROJECT_OPTIONS = [
  "Turf",
  "Pavers",
  "Drip Irrigation",
  "Decorative Gravel/Rock",
  "Plants",
] as const

// Returns the chosen options in menu order, or null if the value is empty or has anything unexpected.
export function parseProjectOptions(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length === 0) return null
  const allowed = PROJECT_OPTIONS as readonly string[]
  if (!value.every((v) => typeof v === "string" && allowed.includes(v))) return null
  return PROJECT_OPTIONS.filter((option) => value.includes(option))
}

// One "Label: value" line per answer, in the order the questions are asked.
// Empty answers are left out so a label never appears without a value.
export function buildProjectDetails(answers: { projects: string[]; budget: string; flexibility: string }): string {
  return [
    ["Options", answers.projects.join(", ")],
    ["Budget", answers.budget],
    ["Budget Flexibility", answers.flexibility],
  ]
    .filter(([, value]) => value.trim() !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")
}

export const BUDGET_OPTIONS = [
  "$10,000 - $15,000",
  "$15,000 - $25,000",
  "$25,000 - $40,000",
  "$40,000 +",
] as const

export const FLEXIBILITY_OPTIONS = [
  "Yes, I prefer premium quality even if the cost increases slightly",
  "Maybe, depends on the options presented",
  "No, I have a fixed budget",
] as const

export function isBudgetOption(value: unknown): value is (typeof BUDGET_OPTIONS)[number] {
  return typeof value === "string" && (BUDGET_OPTIONS as readonly string[]).includes(value)
}

export function isFlexibilityOption(value: unknown): value is (typeof FLEXIBILITY_OPTIONS)[number] {
  return typeof value === "string" && (FLEXIBILITY_OPTIONS as readonly string[]).includes(value)
}

export type MultipleBidsOption = (typeof MULTIPLE_BIDS_OPTIONS)[number]

export function isMultipleBidsOption(value: unknown): value is MultipleBidsOption {
  return typeof value === "string" && (MULTIPLE_BIDS_OPTIONS as readonly string[]).includes(value)
}
