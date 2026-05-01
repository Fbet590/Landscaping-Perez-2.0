import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Testimonials } from "@/components/testimonials"
import { Portfolio } from "@/components/portfolio"
import { Faqs } from "@/components/faqs"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Testimonials />
      <Portfolio />
      <Faqs />
      <Footer />
    </main>
  )
}
