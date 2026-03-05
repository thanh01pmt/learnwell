/**
 * Supabase Client Configuration
 * Provides typed Supabase client for the application
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config, isMockMode } from './env';
import type { Database } from '@/types/database';

// Singleton Supabase client
let supabaseClient: SupabaseClient<Database> | null = null;

/**
 * Get Supabase client instance
 * Returns null in mock mode
 */
export const getSupabaseClient = (): SupabaseClient<Database> | null => {
  if (isMockMode()) {
    console.warn('[Supabase] Running in mock mode - no database connection');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient<Database>(
      config.supabaseUrl,
      config.supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      }
    );
  }

  return supabaseClient;
};

/**
 * Get Supabase client or throw if not configured
 * Use this in places where Supabase is required
 */
export const requireSupabaseClient = (): SupabaseClient<Database> => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error(
      'Supabase client not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, or disable mock mode.'
    );
  }
  return client;
};

// Re-export for convenience
export { config, isMockMode };
