import NewsletterForm from '@/components/NewsletterForm'
import ScrollReveal from '@/components/ScrollReveal'

export default function Newsletter() {
  return (
    <section id="deals" className="py-24 px-6 bg-amber-50">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">
            Never Miss a Treat
          </p>
          <h2 className="text-3xl font-bold text-amber-900 mb-4 text-pretty">
            Get Weekly Deals &amp; New Menu Items
          </h2>
          <p className="text-zinc-600 mb-10 leading-relaxed">
            Sign up for our weekly email or text with fresh deals, seasonal specials, and new
            items before anyone else hears about them.
          </p>

          <NewsletterForm />
        </ScrollReveal>
      </div>
    </section>
  )
}
