const EMAIL_PATTERN = /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i

const FAKE_EMAIL_LOCAL_PARTS = new Set([
  "test", "tester", "testing", "asdf", "asdfgh", "qwerty", "fake", "none", "noemail",
  "no", "na", "n", "abc", "abcd", "abc123", "aaa", "aaaa", "xxx", "xxxx", "email",
  "example", "sample", "user", "name", "admin", "null", "nobody", "nomail", "a", "x",
  "idk", "nope", "nothing", "noreply", "donotreply", "spam", "temp", "temporary",
  "yourname", "youremail", "myemail", "john.doe", "johndoe", "jane.doe", "janedoe",
  "123", "1234", "12345", "123456", "password", "foo", "bar", "foobar", "asd", "zzz",
])

const FAKE_EMAIL_DOMAINS = new Set([
  "example.com", "example.org", "example.net", "test.com", "test.test", "fake.com",
  "email.com", "mail.com", "domain.com", "asdf.com", "noemail.com", "none.com",
  "abc.com", "aaa.com", "xxx.com", "a.com", "b.com", "x.com", "no.com", "na.com",
  "nomail.com", "nothing.com", "yourdomain.com", "mydomain.com", "company.com",
  "gmail.test", "sample.com", "spam.com", "junk.com", "trash.com", "null.com",
])

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "temp-mail.org", "10minutemail.com", "10minutemail.net",
  "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "sharklasers.com",
  "yopmail.com", "yopmail.net", "trashmail.com", "trashmail.net", "throwawaymail.com",
  "getnada.com", "nada.email", "dispostable.com", "maildrop.cc", "mailnesia.com",
  "fakeinbox.com", "tempinbox.com", "tempail.com", "mohmal.com", "emailondeck.com",
  "mintemail.com", "mytemp.email", "spamgourmet.com", "mailcatch.com", "burnermail.io",
  "discard.email", "tmail.ws", "tempr.email", "moakt.com", "1secmail.com", "inboxkitten.com",
  "mailtemp.net", "temp-mail.io", "tmpmail.org", "tmpmail.net", "emailfake.com",
])

// Common provider typos. Users mistype these far more often than they own them.
const EMAIL_DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gmal.com": "gmail.com",
  "gamil.com": "gmail.com", "gnail.com": "gmail.com", "gmail.co": "gmail.com",
  "gmail.con": "gmail.com", "gmail.cm": "gmail.com", "gmail.cmo": "gmail.com",
  "gmail.comm": "gmail.com", "gmaill.com": "gmail.com", "gmeil.com": "gmail.com",
  "hotmal.com": "hotmail.com", "hotmai.com": "hotmail.com", "hotmail.con": "hotmail.com",
  "hotmial.com": "hotmail.com", "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com",
  "yahoo.con": "yahoo.com", "yahou.com": "yahoo.com", "outlok.com": "outlook.com",
  "outlook.con": "outlook.com", "iclod.com": "icloud.com", "icloud.con": "icloud.com",
  "icoud.com": "icloud.com",
}

const BLOCKED_TLDS = new Set(["test", "example", "invalid", "localhost", "local", "internal"])

// Numbers that are never a private person's phone line.
const NON_PERSONAL_AREA_CODES = new Set(["800", "833", "844", "855", "866", "877", "888", "900"])

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
  const fake = "Please enter a real phone number"

  if (areaCode[0] === "0" || areaCode[0] === "1") return "Please enter a valid phone number"
  if (exchange[0] === "0" || exchange[0] === "1") return "Please enter a valid phone number"
  if (areaCode.slice(1) === "11" || exchange.slice(1) === "11") return fake
  if (NON_PERSONAL_AREA_CODES.has(areaCode)) return fake
  if (areaCode === "555" || (exchange === "555" && line.startsWith("01"))) return fake
  if (/^(\d)\1{9}$/.test(digits)) return fake
  if (new Set(digits.split("")).size <= 2) return fake
  if ("01234567890123456789".includes(digits) || "98765432109876543210".includes(digits)) return fake
  if (exchange === "123" && line === "4567") return fake
  if (exchange === "867" && line === "5309") return fake
  if (/^(\d)\1{3}$/.test(line) || line === "1234" || line === "4321") return fake
  if (/^(\d{2})\1{4}$/.test(digits)) return fake

  return null
}

export function validateEmail(input: string): string | null {
  const trimmed = input.trim()
  if (trimmed === "") return "Please enter your email address"
  if (!EMAIL_PATTERN.test(trimmed) || trimmed.includes("..")) {
    return "Please enter a valid email address"
  }

  const [local, domain] = trimmed.toLowerCase().split("@")
  const tld = domain.split(".").pop() as string

  const suggestion = EMAIL_DOMAIN_TYPOS[domain]
  if (suggestion) return `Did you mean ${local}@${suggestion}?`

  if (BLOCKED_TLDS.has(tld)) return "Please enter a real email address"
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return "Please use a permanent email address, not a temporary one"
  if (FAKE_EMAIL_LOCAL_PARTS.has(local) || FAKE_EMAIL_DOMAINS.has(domain)) {
    return "Please enter a real email address"
  }
  if (new Set(local.replace(/[^a-z0-9]/g, "").split("")).size === 1) {
    return "Please enter a real email address"
  }
  // A domain like "aaaa.com" or "x.co" is almost always made up.
  const domainName = domain.split(".").slice(-2, -1)[0] ?? ""
  if (domainName.length < 2 || new Set(domainName.replace(/-/g, "").split("")).size === 1) {
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
  const letters = trimmed.toLowerCase().replace(/[^\p{L}]/gu, "")
  if (new Set(letters.split("")).size === 1) return "Please enter your real name"
  if (/^(test|fake|asdf|qwerty|abc|xyz|none|name|admin|user|na|no)$/.test(letters)) {
    return "Please enter your real name"
  }
  return null
}
