import { Resend } from 'resend'

// resend.batch.send accepts at most 100 emails per call.
const BATCH_CHUNK_SIZE = 100

export type EmailRecipient = {
  email: string
  unsubscribeToken: string
}

export type EmailContent = {
  subject: string
  html: string
}

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY!)
}

/**
 * Sends one personalized email per recipient (e.g. with a per-recipient unsubscribe
 * link) using Resend's batch API, chunked to stay under the 100-email batch limit.
 */
export async function sendWeeklyDealsEmails(
  recipients: EmailRecipient[],
  buildEmail: (recipient: EmailRecipient) => EmailContent
): Promise<{ sent: number; failed: number }> {
  if (recipients.length === 0) return { sent: 0, failed: 0 }

  const resend = getResendClient()
  const from = process.env.RESEND_FROM_EMAIL ?? 'Sweet Crumbs Bakery <deals@example.com>'

  let sent = 0
  let failed = 0

  for (let i = 0; i < recipients.length; i += BATCH_CHUNK_SIZE) {
    const chunk = recipients.slice(i, i + BATCH_CHUNK_SIZE)
    const { data, error } = await resend.batch.send(
      chunk.map((recipient) => {
        const { subject, html } = buildEmail(recipient)
        return { from, to: [recipient.email], subject, html }
      })
    )

    if (error) {
      failed += chunk.length
      continue
    }

    sent += data?.length ?? chunk.length
  }

  return { sent, failed }
}
