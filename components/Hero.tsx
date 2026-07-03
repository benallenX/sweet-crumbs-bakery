import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-40 px-6 overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/80 via-amber-950/60 to-amber-950/80" />
      <ScrollReveal className="relative flex flex-col items-center">
        <p className="text-amber-200 text-sm font-semibold uppercase tracking-widest mb-4">
          Baked with love, every day
        </p>
        <h1 className="text-5xl font-bold text-white leading-tight mb-6 text-pretty">
          Sweet Crumbs Bakery
        </h1>
        <p className="max-w-xl text-lg text-amber-50 leading-relaxed mb-10">
          Handcrafted pastries, artisan breads, and custom cakes made fresh
          each morning in the heart of your neighborhood.
        </p>
        <a
          href="#products"
          className="inline-block bg-amber-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-amber-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        >
          See Our Menu
        </a>
      </ScrollReveal>
    </section>
  );
}
