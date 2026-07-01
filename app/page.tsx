import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";

// Revalidate daily so the footer year (and any other build-time values)
// don't go stale between deploys.
export const revalidate = 86400;

export default function Home() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      <main id="main-content">
        <Hero />
        <About />
        <FeaturedProducts />
        <Newsletter />
        <Contact />
      </main>
      <footer className="bg-amber-900 text-amber-200 text-center text-sm py-6">
        © {new Date().getFullYear()} Sweet Crumbs Bakery. All rights reserved.
      </footer>
    </div>
  );
}
