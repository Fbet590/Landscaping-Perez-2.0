"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQs", href: "#faqs" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent text-accent-foreground">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center rounded-md bg-background px-2 py-1 shadow-sm md:px-3 md:py-1.5">
          <Image
            src="/images/logo.png"
            alt="Landscape Perez LLC"
            width={200}
            height={60}
            className="h-8 md:h-[52px]"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-accent-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#quote"
          className="hidden rounded-md px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 md:inline-block"
          style={{ backgroundColor: "#85BF23" }}
        >
          GET A QUOTE
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-accent-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-accent-foreground/10 bg-accent px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-accent-foreground/80 transition-colors hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#quote"
            className="mt-4 inline-block rounded-md px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            style={{ backgroundColor: "#85BF23" }}
            onClick={() => setMobileOpen(false)}
          >
            GET A QUOTE
          </a>
        </div>
      )}
    </header>
  )
}
