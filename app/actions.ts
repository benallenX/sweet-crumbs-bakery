'use server'

import { getSupabaseAnonClient } from '@/lib/supabase'
import { sendEmail } from '@/lib/resend'
import { sendWeeklyDealsSms } from '@/lib/twilio'
import { welcomeMessage } from '@/content/welcome-message'

export type ContactState = {
  success: boolean
  error: string
}

export type SubscribeState = {
  success: boolean
  error: string
}

export type OrderState = {
  success: boolean
  error: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const US_PHONE_DIGITS_PATTERN = /^\d{10}$/

function getTrimmedString(formData: FormData, field: string, maxLength: number): string {
  const value = formData.get(field)
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

/** Normalizes a US phone number to E.164 (+1XXXXXXXXXX), or null if invalid. */
function normalizeUsPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (US_PHONE_DIGITS_PATTERN.test(digits)) return `+1${digits}`
  return null
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field, bots usually do.
  if (getTrimmedString(formData, 'company', 200)) {
    return { success: true, error: '' }
  }

  const name = getTrimmedString(formData, 'name', 100)
  const email = getTrimmedString(formData, 'email', 200)
  const message = getTrimmedString(formData, 'message', 2000)

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' }
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  // TODO: integrate an email provider (e.g. Resend, Nodemailer) here.
  // Avoid logging raw submission content (name/email/message) since it's PII.

  return { success: true, error: '' }
}

export async function subscribeToDeals(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  // Honeypot: real users never fill this hidden field, bots usually do.
  if (getTrimmedString(formData, 'company', 200)) {
    return { success: true, error: '' }
  }

  const name = getTrimmedString(formData, 'name', 100)
  const email = getTrimmedString(formData, 'email', 200)
  const phoneRaw = getTrimmedString(formData, 'phone', 30)
  const emailOptIn = formData.get('emailOptIn') === 'on'
  const smsOptIn = formData.get('smsOptIn') === 'on'

  if (!emailOptIn && !smsOptIn) {
    return { success: false, error: 'Choose at least one way to hear from us.' }
  }

  if (emailOptIn && !EMAIL_PATTERN.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  let phone: string | null = null
  if (smsOptIn) {
    phone = normalizeUsPhone(phoneRaw)
    if (!phone) {
      return { success: false, error: 'Please enter a valid 10-digit phone number.' }
    }
  }

  const unsubscribeToken = crypto.randomUUID()

  const supabase = getSupabaseAnonClient()
  const { error } = await supabase.from('subscribers').insert({
    name: name || null,
    email: emailOptIn ? email : null,
    phone,
    email_opt_in: emailOptIn,
    sms_opt_in: smsOptIn,
    unsubscribe_token: unsubscribeToken,
  })

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: "Looks like you're already signed up!" }
    }
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  // Best-effort welcome message — signup already succeeded, so a delivery
  // hiccup here shouldn't turn into a user-facing error.
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${unsubscribeToken}`

    if (emailOptIn) {
      await sendEmail(email, {
        subject: welcomeMessage.subject,
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h1 style="color: #78350f;">${welcomeMessage.headline}</h1>
            <p>${welcomeMessage.intro}</p>
            <p style="margin-top: 2rem; font-size: 12px; color: #71717a;">
              <a href="${unsubscribeUrl}">Unsubscribe</a> from Sweet Crumbs Bakery emails.
            </p>
          </div>
        `,
      })
    }

    if (smsOptIn && phone) {
      await sendWeeklyDealsSms([{ phone }], welcomeMessage.smsBody)
    }
  } catch {
    // Swallow delivery errors; the subscriber row was already created successfully.
  }

  return { success: true, error: '' }
}

export async function submitOrderRequest(
  _prev: OrderState,
  formData: FormData
): Promise<OrderState> {
  // Honeypot: real users never fill this hidden field, bots usually do.
  if (getTrimmedString(formData, 'company', 200)) {
    return { success: true, error: '' }
  }

  const name = getTrimmedString(formData, 'name', 100)
  const email = getTrimmedString(formData, 'email', 200)
  const phoneRaw = getTrimmedString(formData, 'phone', 30)
  const item = getTrimmedString(formData, 'item', 200)
  const neededBy = getTrimmedString(formData, 'neededBy', 10)
  const notes = getTrimmedString(formData, 'notes', 1000)
  const quantityRaw = getTrimmedString(formData, 'quantity', 10)

  if (!name || !item) {
    return { success: false, error: 'Please share your name and what you’d like to order.' }
  }

  if (!email && !phoneRaw) {
    return { success: false, error: 'Please provide an email or phone number so we can reach you.' }
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  let phone: string | null = null
  if (phoneRaw) {
    phone = normalizeUsPhone(phoneRaw)
    if (!phone) {
      return { success: false, error: 'Please enter a valid 10-digit phone number.' }
    }
  }

  const quantity = Math.min(Math.max(parseInt(quantityRaw, 10) || 1, 1), 500)

  const supabase = getSupabaseAnonClient()
  const { error } = await supabase.from('order_requests').insert({
    name,
    email: email || null,
    phone,
    item,
    quantity,
    needed_by: neededBy || null,
    notes: notes || null,
  })

  if (error) {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  // Best-effort notification — the request was already saved, so a delivery
  // hiccup here shouldn't turn into a user-facing error.
  try {
    const notifyEmail = process.env.BAKERY_ORDER_NOTIFICATION_EMAIL ?? 'orders@example.com'
    await sendEmail(notifyEmail, {
      subject: `New order request: ${item}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #78350f;">New Order Request</h1>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            ${email ? `<li><strong>Email:</strong> ${email}</li>` : ''}
            ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
            <li><strong>Item:</strong> ${item}</li>
            <li><strong>Quantity:</strong> ${quantity}</li>
            ${neededBy ? `<li><strong>Needed by:</strong> ${neededBy}</li>` : ''}
            ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ''}
          </ul>
        </div>
      `,
    })
  } catch {
    // Swallow delivery errors; the order request row was already created successfully.
  }

  return { success: true, error: '' }
}
