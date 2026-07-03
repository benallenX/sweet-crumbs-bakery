import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Sweet Crumbs Bakery",
  description: "What data Sweet Crumbs Bakery collects through its forms, why, and where it's stored.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      <main id="main-content" className="max-w-2xl mx-auto px-6 py-16 text-zinc-700 flex-1">
      <h1 className="text-3xl font-bold text-amber-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-zinc-400 mb-10">Last updated July 2, 2026</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm mb-10">
        Sweet Crumbs Bakery is a <strong>fictional business</strong> built as a demo/portfolio
        project. This policy is written to be realistic, but it isn&apos;t a substitute for legal
        advice — don&apos;t treat it as a template for a real business without having it reviewed
        by a lawyer. That said, the forms on this site are functional: information you submit is
        genuinely stored and delivered as described below, so please don&apos;t submit anything
        you wouldn&apos;t want kept.
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">What we collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Contact form:</strong> your name, email address, and message.
          </li>
          <li>
            <strong>Newsletter / weekly deals signup:</strong> your name (optional), and the email
            and/or phone number you provide, along with which channels (email, SMS) you opted
            into.
          </li>
          <li>
            <strong>Order requests:</strong> your name, email and/or phone number, the item and
            quantity requested, an optional date needed, and any notes you add.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">Why we collect it</h2>
        <p>
          To respond to your message, send the weekly deals email or text you signed up for, and
          follow up on custom order requests to confirm details and arrange payment. We don&apos;t
          sell or share your information with third parties for their own marketing purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">Where it&apos;s stored and delivered</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Storage:</strong> form submissions are stored in a{" "}
            <a href="https://supabase.com" className="underline hover:text-amber-700">
              Supabase
            </a>{" "}
            (PostgreSQL) database.
          </li>
          <li>
            <strong>Email delivery:</strong> emails (weekly deals, order-request notifications) are
            sent through{" "}
            <a href="https://resend.com" className="underline hover:text-amber-700">
              Resend
            </a>
            .
          </li>
          <li>
            <strong>SMS delivery:</strong> text messages are sent through{" "}
            <a href="https://www.twilio.com" className="underline hover:text-amber-700">
              Twilio
            </a>
            .
          </li>
          <li>
            <strong>Hosting:</strong> the site itself runs on Vercel, which processes standard
            server request logs (IP address, user agent) as part of hosting the site.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">SMS terms</h2>
        <p>
          By opting into text messages, you agree to receive recurring marketing texts from Sweet
          Crumbs Bakery at the number provided. Consent is not a condition of purchase. Message
          frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to any
          message to unsubscribe, or <strong>HELP</strong> for help.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">How long we keep it</h2>
        <p>
          Newsletter and SMS subscriptions are kept until you unsubscribe — every email includes an
          unsubscribe link, and every text can be stopped by replying STOP. Contact form messages
          and order requests are kept so we can follow up, and can be deleted on request (see
          below).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-amber-900 mb-3">Your rights</h2>
        <p>
          You can ask us to access, correct, or delete the information we have about you at any
          time — just reach out through the{" "}
          <Link href="/#contact" className="underline hover:text-amber-700">
            contact form
          </Link>
          .
        </p>
      </section>

      <p className="text-sm text-zinc-400">
        See also our{" "}
        <Link href="/terms" className="underline hover:text-amber-700">
          Terms of Service
        </Link>
        .
      </p>
      </main>
      <Footer />
    </div>
  );
}
