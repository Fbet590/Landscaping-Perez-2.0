import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does a typical hardscape project take?",
    answer:
      "While timelines depend on the complexity and scope, most projects are completed within 2-6 weeks. We provide a clear timeline during your initial consultation.",
  },
  {
    question: "Are your projects covered by a warranty or guarantee?",
    answer:
      "Absolutely! We proudly stand behind our craftsmanship with a satisfaction guarantee, ensuring your complete peace of mind.",
  },
  {
    question: "Do you offer financing or payment plan options?",
    answer:
      "Yes, we provide flexible financing solutions to fit various budgets, including up to 12 months of 0% interest, making it easier to start your dream project sooner.",
  },
]

export function Faqs() {
  return (
    <section id="faqs" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-serif text-3xl font-bold text-foreground md:text-4xl">
          FAQs
        </h2>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
