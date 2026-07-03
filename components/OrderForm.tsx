'use client'

import { useActionState } from 'react'
import { submitOrderRequest } from '@/app/actions'

const initialState = { success: false, error: '' }

const inputClass =
  'w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm placeholder:text-amber-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 aria-invalid:border-red-400'

const itemOptions = [
  'Butter Croissant',
  'Custom Layer Cake',
  'Sourdough Loaf',
  'Chocolate Chunk Cookie',
  'Seasonal Fruit Tart',
  'Cinnamon Roll',
  'Something else',
]

export default function OrderForm() {
  const [state, formAction, pending] = useActionState(submitOrderRequest, initialState)
  const hasError = Boolean(state.error)

  return (
    <form action={formAction} className="flex flex-col gap-4 text-left">
      {/* Honeypot field: hidden from sighted users and screen readers, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="order-company">Company</label>
        <input id="order-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="order-name" className="sr-only">Your name</label>
          <input
            id="order-name"
            type="text"
            name="name"
            placeholder="Your name…"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={hasError}
            aria-describedby="order-form-status"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="order-email" className="sr-only">Your email</label>
          <input
            id="order-email"
            type="email"
            name="email"
            placeholder="Your email…"
            autoComplete="email"
            spellCheck={false}
            maxLength={200}
            aria-invalid={hasError}
            aria-describedby="order-form-status"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="order-phone" className="sr-only">Your phone number</label>
          <input
            id="order-phone"
            type="tel"
            name="phone"
            placeholder="Your phone…"
            autoComplete="tel"
            maxLength={30}
            aria-invalid={hasError}
            aria-describedby="order-form-status"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-[2] flex flex-col gap-1">
          <label htmlFor="order-item" className="sr-only">What would you like to order?</label>
          <select
            id="order-item"
            name="item"
            required
            defaultValue=""
            aria-invalid={hasError}
            aria-describedby="order-form-status"
            className={inputClass}
          >
            <option value="" disabled>
              What would you like to order?
            </option>
            {itemOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="order-quantity" className="sr-only">Quantity</label>
          <input
            id="order-quantity"
            type="number"
            name="quantity"
            placeholder="Qty"
            defaultValue={1}
            min={1}
            max={500}
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="order-needed-by" className="sr-only">Date needed</label>
          <input
            id="order-needed-by"
            type="date"
            name="neededBy"
            className={`${inputClass} text-black`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="order-notes" className="sr-only">Order details</label>
        <textarea
          id="order-notes"
          name="notes"
          rows={4}
          placeholder="Flavor, size, decoration, or anything else we should know…"
          autoComplete="off"
          maxLength={1000}
          className={`${inputClass} resize-none text-black placeholder:text-black`}
        />
      </div>

      <div id="order-form-status" aria-live="polite" aria-atomic="true" className="text-sm text-center min-h-[1.25rem]">
        {state.success && (
          <p className="text-green-700">
            Request received — we&apos;ll follow up to confirm details and payment.
          </p>
        )}
        {state.error && <p className="text-red-700">{state.error}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-center bg-amber-700 text-white font-semibold px-10 py-3 rounded-full hover:bg-amber-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? 'Sending…' : 'Request Order'}
      </button>

      <p className="text-xs text-zinc-400 text-center">
        This is a request only — no payment is collected here. We&apos;ll reach out to confirm
        details and arrange payment.{' '}
        <a href="/privacy" className="underline hover:text-amber-700">
          How we handle your info
        </a>
        .
      </p>
    </form>
  )
}
