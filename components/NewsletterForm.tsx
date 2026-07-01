'use client'

import { useActionState } from 'react'
import { subscribeToDeals } from '@/app/actions'

const initialState = { success: false, error: '' }

const inputClass =
  'w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm placeholder:text-amber-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 aria-invalid:border-red-400'

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToDeals, initialState)
  const hasError = Boolean(state.error)

  return (
    <form action={formAction} className="flex flex-col gap-4 text-left">
      {/* Honeypot field: hidden from sighted users and screen readers, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="newsletter-company">Company</label>
        <input id="newsletter-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="newsletter-name" className="sr-only">Your name</label>
          <input
            id="newsletter-name"
            type="text"
            name="name"
            placeholder="Your name…"
            autoComplete="name"
            maxLength={100}
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="newsletter-email" className="sr-only">Your email</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="Your email…"
            autoComplete="email"
            spellCheck={false}
            maxLength={200}
            aria-invalid={hasError}
            aria-describedby="newsletter-form-status"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="newsletter-phone" className="sr-only">Your phone number</label>
          <input
            id="newsletter-phone"
            type="tel"
            name="phone"
            placeholder="Your phone…"
            autoComplete="tel"
            maxLength={30}
            aria-invalid={hasError}
            aria-describedby="newsletter-form-status"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-zinc-600">
        <label className="flex items-start gap-2">
          <input type="checkbox" name="emailOptIn" className="mt-1 accent-amber-700" />
          <span>Email me weekly deals and new menu items.</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" name="smsOptIn" className="mt-1 accent-amber-700" />
          <span>
            Text me weekly deals. By checking this box, you agree to receive recurring
            marketing text messages from Sweet Crumbs Bakery at the number provided. Consent is
            not a condition of purchase. Msg &amp; data rates may apply. Reply STOP to unsubscribe,
            HELP for help.
          </span>
        </label>
      </div>

      <div id="newsletter-form-status" aria-live="polite" aria-atomic="true" className="text-sm text-center min-h-[1.25rem]">
        {state.success && <p className="text-green-700">You&apos;re in — welcome to the club!</p>}
        {state.error && <p className="text-red-700">{state.error}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-center bg-amber-700 text-white font-semibold px-10 py-3 rounded-full hover:bg-amber-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Signing up…' : 'Get Weekly Deals'}
      </button>
    </form>
  )
}
