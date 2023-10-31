
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

// Create a single supabase client for interacting with your database
const supabase = createPagesBrowserClient();

export function signUp(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signOut() {
  return supabase.auth.signOut();
}

export function getSession() {
  return supabase.auth.getSession();
}