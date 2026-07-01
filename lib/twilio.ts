import twilio from 'twilio'

export type SmsRecipient = {
  phone: string
}

function getTwilioClient() {
  return twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
}

/** Sends the same SMS body to every recipient. Failures are isolated per-recipient. */
export async function sendWeeklyDealsSms(
  recipients: SmsRecipient[],
  body: string
): Promise<{ sent: number; failed: number }> {
  if (recipients.length === 0) return { sent: 0, failed: 0 }

  const client = getTwilioClient()
  const from = process.env.TWILIO_PHONE_NUMBER!

  const results = await Promise.allSettled(
    recipients.map((recipient) => client.messages.create({ to: recipient.phone, from, body }))
  )

  const sent = results.filter((result) => result.status === 'fulfilled').length
  return { sent, failed: results.length - sent }
}
