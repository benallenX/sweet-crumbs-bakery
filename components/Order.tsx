import OrderForm from '@/components/OrderForm'
import ScrollReveal from '@/components/ScrollReveal'

export default function Order() {
  return (
    <section id="order" className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">
            Custom Orders
          </p>
          <h2 className="text-3xl font-bold text-amber-900 mb-4 text-pretty">Order a Cake</h2>
          <p className="text-zinc-600 mb-10 leading-relaxed">
            Planning a birthday, wedding, or party? Tell us what you have in mind and we&apos;ll
            follow up to confirm the details.
          </p>

          <OrderForm />
        </ScrollReveal>
      </div>
    </section>
  )
}
