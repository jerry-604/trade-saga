
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://rqhpnffkqqqtowynnwxd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxaHBuZmZrcXFxdG93eW5ud3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjEwNjksImV4cCI6MjAxMTkzNzA2OX0.84xNFxQu5vq4y5wzMQrjo-WWd63fquZyVMgtcBIRYY0', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

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