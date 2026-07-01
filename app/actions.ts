'use server'

import { getSupabaseAnonClient } from '@/lib/supabase'

export type ContactState = {
  success: boolean
  error: string
}

export type SubscribeState = {
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

  const supabase = getSupabaseAnonClient()
  const { error } = await supabase.from('subscribers').insert({
    name: name || null,
    email: emailOptIn ? email : null,
    phone,
    email_opt_in: emailOptIn,
    sms_opt_in: smsOptIn,
  })

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: "Looks like you're already signed up!" }
    }
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true, error: '' }
}
