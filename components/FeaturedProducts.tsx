"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ProductGridReveal from "@/components/ProductGridReveal";

type Category = "pastries" | "breads" | "cakes" | "cookies";

const categories: { id: Category; label: string }[] = [
  { id: "pastries", label: "Pastries" },
  { id: "breads", label: "Breads" },
  { id: "cakes", label: "Cakes" },
  { id: "cookies", label: "Cookies" },
];

const products: {
  image: string;
  name: string;
  price: string;
  desc: string;
  category: Category;
}[] = [
  {
    image: "/images/croissant.jpg",
    name: "Butter Croissant",
    price: "$3.50",
    desc: "Flaky, golden layers of all-butter pastry dough.",
    category: "pastries",
  },
  {
    image: "/images/cake.jpg",
    name: "Custom Layer Cake",
    price: "from $45",
    desc: "Made to order for birthdays, weddings, and any occasion.",
    category: "cakes",
  },
  {
    image: "/images/sourdough.jpg",
    name: "Sourdough Loaf",
    price: "$8.00",
    desc: "Long-fermented, crispy crust, open crumb. Baked every morning.",
    category: "breads",
  },
  {
    image: "/images/cookie.jpg",
    name: "Chocolate Chunk Cookie",
    price: "$2.75",
    desc: "Chewy center, crisp edges, loaded with dark chocolate.",
    category: "cookies",
  },
  {
    image: "/images/tart.jpg",
    name: "Seasonal Fruit Tart",
    price: "$5.50",
    desc: "Buttery shell filled with vanilla cream and market fruit.",
    category: "pastries",
  },
  {
    image: "/images/cinnamon-roll.jpg",
    name: "Cinnamon Roll",
    price: "$4.00",
    desc: "Soft, pillowy rolls glazed with cream cheese frosting.",
    category: "pastries",
  },
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((item) => item.category === activeCategory);

  return (
    <section id="products" className="py-24 px-6 bg-amber-50">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">
            Fresh Today
          </p>
          <h2 className="text-3xl font-bold text-amber-900 text-pretty">Featured Products</h2>
        </ScrollReveal>

        <div
          role="group"
          aria-label="Filter menu by category"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            aria-pressed={activeCategory === "all"}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
              activeCategory === "all"
                ? "bg-amber-700 text-white"
                : "bg-white text-amber-800 hover:bg-amber-100"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
                activeCategory === category.id
                  ? "bg-amber-700 text-white"
                  : "bg-white text-amber-800 hover:bg-amber-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <ProductGridReveal
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-1">{item.name}</h3>
                <p className="text-amber-700 font-medium text-sm mb-3">{item.price}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </ProductGridReveal>

        {filteredProducts.length === 0 && (
          <p className="text-center text-zinc-500 mt-10">No items in this category yet.</p>
        )}
      </div>
    </section>
  );
}
