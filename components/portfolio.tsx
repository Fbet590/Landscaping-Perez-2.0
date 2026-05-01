"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Backyard transformation with turf and retaining wall" },
  { src: "/images/gallery-2.jpg", alt: "Modern backyard with paver patio and turf" },
  { src: "/images/gallery-3.jpg", alt: "Front yard hardscape with decorative pavers" },
  { src: "/images/gallery-4.jpg", alt: "Pool area with stone paver deck" },
  { src: "/images/gallery-5.jpg", alt: "Zen garden with decorative pathway" },
]

export function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length)
  }, [lightboxIndex])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)
  }, [lightboxIndex])

  useEffect(() => {
    if (lightboxIndex === null) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [lightboxIndex, goNext, goPrev])

  return (
    <>
      <section id="portfolio" className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              See our stunning results
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Explore Our Recent Transformations
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Imagine the possibilities for your own yard
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className={`group relative cursor-pointer overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className={`relative ${i === 0 ? "aspect-[3/4] sm:aspect-[16/12]" : "aspect-[4/3]"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
                      View
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image: ${galleryImages[lightboxIndex].alt}`}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-background/20 text-background transition-colors hover:bg-background/40"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 z-10 flex size-10 items-center justify-center rounded-full bg-background/20 text-background transition-colors hover:bg-background/40"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image */}
          <div
            className="relative mx-16 max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              style={{ width: "auto", height: "auto", maxHeight: "85vh" }}
              priority
            />
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 z-10 flex size-10 items-center justify-center rounded-full bg-background/20 text-background transition-colors hover:bg-background/40"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/20 px-4 py-1.5 text-xs font-medium text-background backdrop-blur-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  )
}
