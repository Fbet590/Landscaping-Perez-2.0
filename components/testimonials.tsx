"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

const testimonials = [
  {
    name: "Curtis Layton",
    color: "bg-emerald-600",
    initial: "C",
    rating: 5,
    text: "Very professional work, and was very grateful for Brian's team and their wonderful job doing the custom plan I created for our backyard. Very pleasant to work with",
  },
  {
    name: "Francisco Navarrete",
    color: "bg-orange-500",
    initial: "F",
    rating: 5,
    text: "Perez Landscaping wasn't my first option that came across my path when I was looking to get my backyard design done. Thankfully with some minor errors with the original company I was booked with I decided to go with a smaller, family owned business man like Brian himself that puts in the work alongside his workers and works hard and does excellent works in a timely manner. Great results with a very great price !!",
  },
  {
    name: "Ezequiel Nu\u00f1ez",
    color: "bg-emerald-600",
    initial: "E",
    rating: 5,
    text: "Brayan and his team helped create an amazing and usable backyard! 5/5, I highly recommend!",
  },
  {
    name: "Lalat Behera",
    color: "bg-orange-500",
    initial: "L",
    rating: 5,
    text: "I recently hired them for doing yard work . They did a great job and completed the work in a day . I am pretty satisfied with the job , yard looks great . Would recommend 100%.",
  },
  {
    name: "GARY BEATY",
    color: "bg-emerald-600",
    initial: "G",
    rating: 5,
    text: "The Perez crew did a great job on my backyard and had it on time as well A+",
  },
  {
    name: "Peter R. Ricci",
    color: "bg-orange-500",
    initial: "P",
    rating: 5,
    text: "Brian and his crew have been caring for my yard for almost two years now. I can say without any reservations that they do an excellent job and are very dependable. Brian responds to my texts and is always available to fix any problems I may have including sprinkler problems. I would recommend his quality services to anyone without reservations.",
  },
  {
    name: "Duglimar Nohemi Galindez Castaneda",
    color: "bg-emerald-600",
    initial: "D",
    rating: 5,
    text: "The team was very fast, efficient and respectful, they did the project in my backyard in almost three days and it looks beautiful 100% recommended",
  },
  {
    name: "Brenda MacDonnell",
    color: "bg-orange-500",
    initial: "B",
    rating: 5,
    text: "Very happy with the artificial turf install. Looks & feels great. Great pricing.",
  },
  {
    name: "David Bryant",
    color: "bg-emerald-600",
    initial: "D",
    rating: 5,
    text: "They did a fantastic job. Showed up on time, quality work and cleaned up afterwards. I would definitely use this company again and/or refer them to anyone looking for landscaping projects.",
  },
  {
    name: "Jodi Garza",
    color: "bg-orange-500",
    initial: "J",
    rating: 5,
    text: "Awesome job by Brian and his entire crew. Communication is excellent, very clear on the quote and work done. Took their time to take my dirt yard to something useable. Pricing was excellent as well, no hidden or surprise fees added. I would highly recommend Brian and his guys.",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const t = testimonials[current]

  return (
    <section id="testimonials" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#85BF23" }}>
            {"Don't just take our word for it..."}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-3xl">
            {"Here's What Our Past Clients Had To Say"}
          </h2>
        </div>

        {/* Single review slideshow */}
        <div
          className="relative mt-10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Arrow buttons */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-colors hover:bg-muted md:-left-14"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-colors hover:bg-muted md:-right-14"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Single card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
            <div
              key={`${current}-${direction}`}
              className="animate-in fade-in slide-in-from-right-4 duration-300 p-8 md:p-10"
            >
              {/* Google icon + stars row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GoogleIcon className="size-6" />
                  <span className="text-sm font-medium text-muted-foreground">Google Review</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="size-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Review text */}
              <blockquote className="mt-6 text-base leading-relaxed text-foreground md:text-lg">
                {`"${t.text}"`}
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-full ${t.color} text-base font-bold text-background`}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`size-2.5 rounded-full transition-all ${
                i === current
                  ? "scale-125"
                  : "bg-border hover:bg-muted-foreground/30"
              }`}
              style={i === current ? { backgroundColor: "#85BF23" } : undefined}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {current + 1} of {testimonials.length} reviews
        </p>
      </div>
    </section>
  )
}
