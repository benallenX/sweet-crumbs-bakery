import ContactForm from '@/components/ContactForm'
import ScrollReveal from '@/components/ScrollReveal'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">
            Get in Touch
          </p>
          <h2 className="text-3xl font-bold text-amber-900 mb-4 text-pretty">Contact Us</h2>
          <p className="text-zinc-600 mb-10 leading-relaxed">
            Have a custom order, question, or just want to say hello? We&apos;d love to hear from you.
          </p>

          <ContactForm />
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-14 flex flex-col sm:flex-row justify-center gap-8 text-sm text-zinc-500">
          <div>
            <p className="font-semibold text-amber-900 mb-1">Address</p>
            <p>42 Crumble Lane, Maplewood, NY 10001</p>
          </div>
          <div>
            <p className="font-semibold text-amber-900 mb-1">Hours</p>
            <p>Mon – Sat: 7 am – 6 pm</p>
            <p>Sunday: 8 am – 3 pm</p>
          </div>
          <div>
            <p className="font-semibold text-amber-900 mb-1">Phone</p>
            <p>(555) 123-4567</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
