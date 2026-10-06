const EMAIL_PATTERN = /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i

const FAKE_EMAIL_LOCAL_PARTS = new Set([
  "test", "tester", "testing", "asdf", "asdfgh", "qwerty", "fake", "none", "noemail",
  "no", "na", "n", "abc", "abcd", "abc123", "aaa", "aaaa", "xxx", "xxxx", "email",
  "example", "sample", "user", "name", "admin", "null", "nobody", "nomail", "a", "x",
])

const FAKE_EMAIL_DOMAINS = new Set([
  "example.com", "example.org", "example.net", "test.com", "test.test", "fake.com",
  "email.com", "mail.com", "domain.com", "asdf.com", "noemail.com", "none.com",
  "abc.com", "aaa.com", "xxx.com", "a.com", "b.com", "x.com", "mailinator.com",
  "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com",
])

export function normalizePhone(input: string): string | null {
  if (/[a-z]/i.test(input)) return null
  if (!/^[\d\s().+\-]+$/.test(input)) return null

  let digits = input.replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1)
  if (digits.length !== 10) return null
  return digits
}

export function validatePhone(input: string): string | null {
  const trimmed = input.trim()
  if (trimmed === "") return "Please enter your phone number"

  const digits = normalizePhone(trimmed)
  if (!digits) return "Please enter a valid 10-digit phone number"

  const areaCode = digits.slice(0, 3)
  const exchange = digits.slice(3, 6)
  const line = digits.slice(6)

  if (areaCode[0] === "0" || areaCode[0] === "1") return "Please enter a valid phone number"
  if (exchange[0] === "0" || exchange[0] === "1") return "Please enter a valid phone number"
  if (areaCode === "555" || (exchange === "555" && line.startsWith("01"))) {
    return "Please enter a real phone number"
  }
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a real phone number"
  if (new Set(digits.split("")).size <= 2) return "Please enter a real phone number"
  if ("01234567890123456789".includes(digits) || "98765432109876543210".includes(digits)) {
    return "Please enter a real phone number"
  }
  if (exchange === "123" && line === "4567") return "Please enter a real phone number"

  return null
}

export function validateEmail(input: string): string | null {
  const trimmed = input.trim()
  if (trimmed === "") return "Please enter your email address"
  if (!EMAIL_PATTERN.test(trimmed) || trimmed.includes("..")) {
    return "Please enter a valid email address"
  }

  const [local, domain] = trimmed.toLowerCase().split("@")
  if (FAKE_EMAIL_LOCAL_PARTS.has(local) || FAKE_EMAIL_DOMAINS.has(domain)) {
    return "Please enter a real email address"
  }
  if (new Set(local.replace(/[^a-z0-9]/g, "").split("")).size === 1) {
    return "Please enter a real email address"
  }

  return null
}

export function validateName(input: string): string | null {
  const trimmed = input.trim()
  if (trimmed === "") return "Please enter your name"
  if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(trimmed) || trimmed.replace(/[^\p{L}]/gu, "").length < 2) {
    return "Please enter your real name"
  }
  return null
}
