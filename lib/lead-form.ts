export const MULTIPLE_BIDS_OPTIONS = [
  "Yes (Multiple bids is better)",
  "No, I only want a bid from 1 company",
] as const

export type MultipleBidsOption = (typeof MULTIPLE_BIDS_OPTIONS)[number]

export function isMultipleBidsOption(value: unknown): value is MultipleBidsOption {
  return typeof value === "string" && (MULTIPLE_BIDS_OPTIONS as readonly string[]).includes(value)
}
