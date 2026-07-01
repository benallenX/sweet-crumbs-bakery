import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing unsubscribe token.' }, { status: 400 })
  }

  const supabase = getSupabaseAdminClient()
  const { error } = await supabase
    .from('subscribers')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Unsubscribed</title></head>
  <body style="font-family: sans-serif; text-align: center; padding: 4rem 1rem;">
    <h1>You've been unsubscribed</h1>
    <p>You won't receive any more deals or menu updates from Sweet Crumbs Bakery.</p>
  </body>
</html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
