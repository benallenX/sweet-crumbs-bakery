import { createClient } from '@supabase/supabase-js'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

/**
 * Public client used by the subscribe form's server action.
 * Only has permission to INSERT into `subscribers` (see RLS policy) — never read/update/delete.
 */
export function getSupabaseAnonClient() {
  return createClient(requireEnv('NEXT_PUBLIC_SUPABASE_URL'), requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'))
}

/**
 * Service-role client that bypasses RLS. Server-only — used exclusively by the
 * weekly cron job and the unsubscribe route. Never import this in client code.
 */
export function getSupabaseAdminClient() {
  return createClient(requireEnv('NEXT_PUBLIC_SUPABASE_URL'), requireEnv('SUPABASE_SERVICE_ROLE_KEY'))
}
