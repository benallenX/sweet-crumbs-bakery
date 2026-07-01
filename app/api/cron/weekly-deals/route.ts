import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase'
import { sendWeeklyDealsEmails, type EmailRecipient } from '@/lib/resend'
import { sendWeeklyDealsSms } from '@/lib/twilio'
import { weeklyDeal } from '@/content/weekly-deal'

type SubscriberRow = {
  email: string | null
  phone: string | null
  email_opt_in: boolean
  sms_opt_in: boolean
  unsubscribe_token: string
}

function buildEmail(recipient: EmailRecipient) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${recipient.unsubscribeToken}`
  const itemsHtml = weeklyDeal.items
    .map((item) => `<li><strong>${item.name}</strong> — ${item.note}</li>`)
    .join('')

  return {
    subject: weeklyDeal.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #78350f;">${weeklyDeal.headline}</h1>
        <p>${weeklyDeal.intro}</p>
        <ul>${itemsHtml}</ul>
        <p style="margin-top: 2rem; font-size: 12px; color: #71717a;">
          <a href="${unsubscribeUrl}">Unsubscribe</a> from Sweet Crumbs Bakery emails.
        </p>
      </div>
    `,
  }
}

// Triggered weekly by the Vercel Cron Job defined in vercel.json.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase
    .from('subscribers')
    .select('email, phone, email_opt_in, sms_opt_in, unsubscribe_token')
    .eq('status', 'active')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const subscribers = data as SubscriberRow[]

  const emailRecipients: EmailRecipient[] = subscribers
    .filter((subscriber) => subscriber.email_opt_in && subscriber.email)
    .map((subscriber) => ({
      email: subscriber.email as string,
      unsubscribeToken: subscriber.unsubscribe_token,
    }))

  const smsRecipients = subscribers
    .filter((subscriber) => subscriber.sms_opt_in && subscriber.phone)
    .map((subscriber) => ({ phone: subscriber.phone as string }))

  const [emailResult, smsResult] = await Promise.all([
    sendWeeklyDealsEmails(emailRecipients, buildEmail),
    sendWeeklyDealsSms(smsRecipients, weeklyDeal.smsBody),
  ])

  return NextResponse.json({ email: emailResult, sms: smsResult })
}
