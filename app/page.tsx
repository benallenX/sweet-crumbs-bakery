import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProducts from "@/components/FeaturedProducts";
import Order from "@/components/Order";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
        <Order />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
