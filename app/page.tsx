export default function Home() {
  return (
    <div className="flex flex-col min-h-full font-sans">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center bg-amber-50 py-32 px-6">
        <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-4">
          Baked with love, every day
        </p>
        <h1 className="text-5xl font-bold text-amber-900 leading-tight mb-6">
          Sweet Crumbs Bakery
        </h1>
        <p className="max-w-xl text-lg text-amber-800 leading-relaxed mb-10">
          Handcrafted pastries, artisan breads, and custom cakes made fresh
          each morning in the heart of your neighborhood.
        </p>
        <a
          href="#products"
          className="inline-block bg-amber-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-amber-700 transition-colors"
        >
          See Our Menu
        </a>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 bg-amber-100 rounded-2xl h-72 flex items-center justify-center text-6xl">
            🧁
          </div>
          <div className="flex-1">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
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
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-24 px-6 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Fresh Today
            </p>
            <h2 className="text-3xl font-bold text-amber-900">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { emoji: "🥐", name: "Butter Croissant", price: "$3.50", desc: "Flaky, golden layers of all-butter pastry dough." },
              { emoji: "🎂", name: "Custom Layer Cake", price: "from $45", desc: "Made to order for birthdays, weddings, and any occasion." },
              { emoji: "🍞", name: "Sourdough Loaf", price: "$8.00", desc: "Long-fermented, crispy crust, open crumb. Baked every morning." },
              { emoji: "🍪", name: "Chocolate Chunk Cookie", price: "$2.75", desc: "Chewy center, crisp edges, loaded with dark chocolate." },
              { emoji: "🥧", name: "Seasonal Fruit Tart", price: "$5.50", desc: "Buttery shell filled with vanilla cream and market fruit." },
              { emoji: "☕", name: "Cinnamon Roll", price: "$4.00", desc: "Soft, pillowy rolls glazed with cream cheese frosting." },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-semibold text-amber-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-amber-600 font-medium text-sm mb-3">
                  {item.price}
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-2">
            Get in Touch
          </p>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Contact Us</h2>
          <p className="text-zinc-600 mb-10 leading-relaxed">
            Have a custom order, question, or just want to say hello? We'd love
            to hear from you.
          </p>
          <form className="flex flex-col gap-4 text-left">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="flex-1 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <textarea
              rows={5}
              placeholder="Your message"
              className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />
            <button
              type="submit"
              className="self-center bg-amber-600 text-white font-semibold px-10 py-3 rounded-full hover:bg-amber-700 transition-colors"
            >
              Send Message
            </button>
          </form>
          <div className="mt-14 flex flex-col sm:flex-row justify-center gap-8 text-sm text-zinc-500">
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
          </div>
        </div>
      </section>

      <footer className="bg-amber-900 text-amber-200 text-center text-sm py-6">
        © {new Date().getFullYear()} Sweet Crumbs Bakery. All rights reserved.
      </footer>
    </div>
  );
}
