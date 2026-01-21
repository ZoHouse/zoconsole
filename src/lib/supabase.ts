import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database, User } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Service role key for admin operations (bypasses RLS)
// Note: In Vite, env vars must be prefixed with VITE_ to be accessible
const supabaseServiceRoleKey = 
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 
  import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

let supabase: SupabaseClient<Database>;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
} else {
  console.warn('Supabase environment variables not set.');
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

/**
 * Get an admin Supabase client that bypasses RLS policies
 * WARNING: Only use this for admin operations after verifying user permissions
 */
export const getAdminSupabaseClient = (): SupabaseClient<Database> => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn('Service role key not configured. Falling back to anon client.');
    console.warn('Please set VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file.');
    return supabase;
  }
  
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export { supabase };

export const syncUserToSupabase = async (
  zoUser: {
    id: string;
    mobile_number?: string;
    mobile_country_code?: string;
    email?: string;
    name?: string;
    [key: string]: any;
  },
  zoToken?: string,
  tokenExpiry?: number
): Promise<{ success: boolean; data?: User; error?: string }> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('zo_user_id', zoUser.id)
      .single();

    const now = new Date().toISOString();
    const deviceId = localStorage.getItem('zo_device_id');
    const deviceSecret = localStorage.getItem('zo_device_secret');

    if (existingUser) {
      const { data, error } = await supabase
        .from('users')
        .update({
          phone_number: zoUser.mobile_number || null,
          phone: zoUser.mobile_country_code ? `+${zoUser.mobile_country_code}${zoUser.mobile_number}` : null,
          email: zoUser.email || null,
          name: zoUser.name || null,
          zo_token: zoToken || null,
          zo_token_expiry: tokenExpiry ? new Date(tokenExpiry).toISOString() : null,
          zo_device_id: deviceId || null,
          zo_device_secret: deviceSecret || null,
          zo_synced_at: now,
          zo_sync_status: 'synced',
          last_seen: now,
          updated_at: now,
        })
        .eq('id', existingUser.id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data as User };
    } else {
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: zoUser.id,
          zo_user_id: zoUser.id,
          phone_number: zoUser.mobile_number || null,
          phone: zoUser.mobile_country_code ? `+${zoUser.mobile_country_code}${zoUser.mobile_number}` : null,
          email: zoUser.email || null,
          name: zoUser.name || null,
          zo_token: zoToken || null,
          zo_token_expiry: tokenExpiry ? new Date(tokenExpiry).toISOString() : null,
          zo_device_id: deviceId || null,
          zo_device_secret: deviceSecret || null,
          zo_synced_at: now,
          zo_sync_status: 'synced',
          last_seen: now,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data as User };
    }
  } catch (err) {
    return { success: false, error: String(err) };
  }
};

export const getCachedUser = async (zoUserId: string): Promise<User | null> => {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('zo_user_id', zoUserId)
    .single();

  if (error) return null;
  return data as User;
};

export const getNodes = async () => {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  const { data } = await supabase
    .from('nodes')
    .select('*')
    .eq('status', 'active')
    .order('name');

  return data || [];
};

export const getLeaderboard = async (limit = 100) => {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  const { data } = await supabase
    .from('leaderboards')
    .select('*')
    .order('zo_points', { ascending: false })
    .limit(limit);

  return data || [];
};

export type { Database, User };
