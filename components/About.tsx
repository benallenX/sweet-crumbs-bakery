import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <ScrollReveal className="flex-1">
          <div aria-hidden="true" className="bg-amber-100 rounded-2xl h-72 flex items-center justify-center text-6xl">
            🧁
          </div>
        </ScrollReveal>
        <ScrollReveal className="flex-1" delay={0.15}>
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">
            Our Story
          </p>
          <h2 className="text-3xl font-bold text-amber-900 mb-4 text-pretty">
            About Sweet Crumbs
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-4">
            Founded in 2010, Sweet Crumbs Bakery started as a small kitchen
            experiment and grew into a beloved neighborhood staple. We use
            locally sourced ingredients and time-honored recipes passed down
            through generations.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Every item is baked fresh daily — no preservatives, no shortcuts.
            Just honest, delicious baked goods made by people who genuinely
            love what they do.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
