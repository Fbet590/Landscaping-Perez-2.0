"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"

const services = [
  {
    title: "Driveways & Walkways",
    description:
      "Enhance your home's curb appeal with beautifully crafted driveways and walkways built to last.",
    image: "/images/driveways.jpg",
  },
  {
    title: "Patios, Porches & Terraces",
    description:
      "Create inviting outdoor spaces perfect for relaxation, entertaining, and making unforgettable memories.",
    image: "/images/patios.jpg",
  },
  {
    title: "Interior & Exterior Walls",
    description:
      "Elevate your space with expertly designed interior and exterior walls that combine strength, function, and style.",
    image: "/images/walls.jpg",
  },
  {
    title: "Landscape Design & Installation",
    description:
      "Transform your yard into a stunning, customized landscape designed and installed to enhance your home's beauty and value.",
    image: "/images/landscape-design.jpg",
  },
  {
    title: "Retaining Walls for Added Support",
    description:
      "Protect your property and enhance its beauty with durable retaining walls that provide essential support and structure.",
    image: "/images/retaining-walls.jpg",
  },
  {
    title: "Complete Outdoor Transformations",
    description:
      "Reimagine your outdoor space with transformations designed to elevate beauty, functionality, and property value.",
    image: "/images/transformations.jpg",
  },
]

export function Services() {
  const [current, setCurrent] = useState(0)
  const total = services.length
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 4000)
  }, [total])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const goTo = useCallback(
    (i: number) => {
      setCurrent(i)
      startTimer()
    },
    [startTimer]
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goTo((current + 1) % total)
      } else {
        goTo((current - 1 + total) % total)
      }
    }
  }

  return (
    <section id="services" className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-lg">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#85BF23" }}>
            Ready to reimagine your outdoor living space?
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-snug text-foreground md:text-4xl">
            Our Expert Hardscape Services
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Our expert team is ready to handle projects of all sizes and
            complexities; always ensuring meticulous craftsmanship, clear
            communication, and results that exceed your expectations.
          </p>
          <a
            href="#quote"
            className="mt-6 inline-block rounded-md px-6 py-3 text-sm font-semibold uppercase text-primary-foreground transition-colors hover:opacity-90"
            style={{ backgroundColor: "#85BF23" }}
          >
            GET A QUOTE
          </a>
        </div>

        {/* Auto-scroll cards */}
        <div
          className="overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {services.map((service, i) => (
              <div key={i} className="w-full shrink-0">
                <div className="overflow-hidden rounded-xl bg-background shadow-md">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 md:p-8">
                    <h3 className="font-serif text-xl font-bold text-foreground md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to service ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-6"
                  : "w-2 bg-border hover:bg-muted-foreground/40"
              }`}
              style={i === current ? { backgroundColor: "#85BF23" } : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
