import Image from "next/image"
import { Check } from "lucide-react"

const trustPoints = [
  "Clear, Upfront Pricing",
  "Proven Expertise & Stunning Results",
  "Communication You Can Count On",
  "Expert Material Guidance",
  "Permits Handled For You",
  "Professional, Reliable Service",
]

export function Experience() {
  return (
    <section id="about" className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          {/* Image stack with overlapping second image */}
          <div className="relative w-full md:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/experience-yard.jpg"
                alt="Beautiful landscaped backyard with green turf"
                fill
                className="object-cover"
              />
            </div>
            {/* Overlapping smaller image */}
            <div className="absolute -bottom-6 -right-4 z-10 hidden aspect-[4/3] w-48 overflow-hidden rounded-lg border-4 border-background shadow-xl md:block lg:w-56">
              <Image
                src="/images/experience-detail.jpg"
                alt="Detail of stone pavers and turf installation"
                fill
                className="object-cover"
              />
            </div>
            {/* 10+ years badge */}
            <div className="absolute left-4 top-4 rounded-lg bg-primary px-5 py-4 text-primary-foreground shadow-lg">
              <span className="block text-3xl font-bold">10+</span>
              <span className="text-sm font-semibold leading-tight">
                Years Experience
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              {"Choosing a hardscaper doesn't have to be stressful"}
            </p>
            <h2 className="mt-3 font-serif text-xl font-extrabold leading-snug text-foreground md:text-2xl lg:text-3xl">
              No more endless searching, hidden costs, or surprise delays
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              {"Here's why homeowners trust us:"}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="size-3 text-primary-foreground" />
                  </span>
                  <span className="text-sm text-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="mt-8 inline-block rounded-md px-6 py-3 text-sm font-semibold uppercase text-primary-foreground transition-colors hover:opacity-90"
              style={{ backgroundColor: "#85BF23" }}
            >
              GET A QUOTE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
