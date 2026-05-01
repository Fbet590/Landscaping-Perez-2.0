import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Testimonials } from "@/components/testimonials"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { Faqs } from "@/components/faqs"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Experience />
      <Testimonials />
      <Services />
      <Portfolio />
      <Faqs />
      <Footer />
    </main>
  )
}
