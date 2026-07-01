import { createClient } from '@supabase/supabase-js'

/**
 * Public client used by the subscribe form's server action.
 * Only has permission to INSERT into `subscribers` (see RLS policy) — never read/update/delete.
 */
export function getSupabaseAnonClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

/**
 * Service-role client that bypasses RLS. Server-only — used exclusively by the
 * weekly cron job and the unsubscribe route. Never import this in client code.
 */
export function getSupabaseAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
