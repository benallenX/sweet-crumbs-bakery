import ScrollReveal from "@/components/ScrollReveal";
import ProductGridReveal from "@/components/ProductGridReveal";

const products = [
  { emoji: "🥐", name: "Butter Croissant", price: "$3.50", desc: "Flaky, golden layers of all-butter pastry dough." },
  { emoji: "🎂", name: "Custom Layer Cake", price: "from $45", desc: "Made to order for birthdays, weddings, and any occasion." },
  { emoji: "🍞", name: "Sourdough Loaf", price: "$8.00", desc: "Long-fermented, crispy crust, open crumb. Baked every morning." },
  { emoji: "🍪", name: "Chocolate Chunk Cookie", price: "$2.75", desc: "Chewy center, crisp edges, loaded with dark chocolate." },
  { emoji: "🥧", name: "Seasonal Fruit Tart", price: "$5.50", desc: "Buttery shell filled with vanilla cream and market fruit." },
  { emoji: "☕", name: "Cinnamon Roll", price: "$4.00", desc: "Soft, pillowy rolls glazed with cream cheese frosting." },
];

export default function FeaturedProducts() {
  return (
    <section id="products" className="py-24 px-6 bg-amber-50">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-2">
            Fresh Today
          </p>
          <h2 className="text-3xl font-bold text-amber-900 text-pretty">Featured Products</h2>
        </ScrollReveal>
        <ProductGridReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div aria-hidden="true" className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-semibold text-amber-900 mb-1">{item.name}</h3>
              <p className="text-amber-700 font-medium text-sm mb-3">{item.price}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </ProductGridReveal>
      </div>
    </section>
  );
}
