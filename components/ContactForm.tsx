'use client'

import { useActionState } from 'react'
import { sendContactMessage } from '@/app/actions'

const initialState = { success: false, error: '' }

const inputClass =
  'w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm placeholder:text-amber-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 aria-invalid:border-red-400'

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState)
  const hasError = Boolean(state.error)

  return (
    <form action={formAction} className="flex flex-col gap-4 text-left">
      {/* Honeypot field: hidden from sighted users and screen readers, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="name" className="sr-only">Your name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name…"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={hasError}
            aria-describedby="contact-form-status"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="email" className="sr-only">Your email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email…"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={200}
            aria-invalid={hasError}
            aria-describedby="contact-form-status"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="sr-only">Your message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Your message…"
          autoComplete="off"
          required
          maxLength={2000}
          aria-invalid={hasError}
          aria-describedby="contact-form-status"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div id="contact-form-status" aria-live="polite" aria-atomic="true" className="text-sm text-center min-h-[1.25rem]">
        {state.success && <p className="text-green-700">Message sent — we&apos;ll be in touch soon!</p>}
        {state.error && <p className="text-red-700">{state.error}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-center bg-amber-700 text-white font-semibold px-10 py-3 rounded-full hover:bg-amber-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
