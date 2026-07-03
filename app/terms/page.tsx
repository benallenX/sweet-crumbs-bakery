import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Sweet Crumbs Bakery",
  description: "Terms governing the use of the Sweet Crumbs Bakery demo website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      <main id="main-content" className="max-w-2xl mx-auto px-6 py-16 text-zinc-700 flex-1">
      <h1 className="text-3xl font-bold text-amber-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-zinc-400 mb-10">Last updated July 2, 2026</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm mb-10">
        Sweet Crumbs Bakery is a <strong>fictional business</strong> created for demonstration
        purposes. There is no real bakery, storefront, or bakery staff behind this site — any
        address, phone number, or hours shown are illustrative, not real contact details for an
        operating business.
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">No e-commerce or payment</h2>
        <p>
          This site does not process payments. The order form on this site submits a{" "}
          <strong>request</strong> only — no products are sold, no payment information is
          collected, and no order is confirmed until a follow-up conversation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">Use of the site</h2>
        <p>
          You may browse this site and use its forms as intended (asking a question, requesting
          weekly deals, or submitting a mock order request). Don&apos;t use the forms to submit
          spam, abusive content, or attempt to disrupt the site or the services it relies on
          (Supabase, Resend, Twilio, Vercel).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">No warranty</h2>
        <p>
          The site and its content are provided &quot;as is,&quot; without warranties of any kind,
          for demonstration purposes only. Since Sweet Crumbs Bakery is not a real business, no
          goods or services are actually offered, sold, or fulfilled.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">Changes</h2>
        <p>
          These terms may be updated as the site changes. Continued use of the site after an
          update means you accept the revised terms.
        </p>
      </section>

      <p className="text-sm text-zinc-400">
        See also our{" "}
        <Link href="/privacy" className="underline hover:text-amber-700">
          Privacy Policy
        </Link>
        .
      </p>
      </main>
      <Footer />
    </div>
  );
}
