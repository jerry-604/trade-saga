
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

export function signInWithOAuth(provider: 'google' | 'github') {
  return supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: '/dashboard'
    }
  });
}

export async function uploadAvatar(avatarFile: any) {
  const { data: { session }, error } = await getSession();
  if (!session) {
    return { error: "No session" };
  }

  if (!avatarFile) {
    return { error: "No file" };
  }

  const upload = await supabase.storage.from('avatars').update(`pfps/${session.user.email}.png`, avatarFile, {
    cacheControl: '3600',
    upsert: true
  });

  if (upload.error) {
    return { error: "Could not upload image" };
  }

  return supabase
    .storage
    .from('avatars')
    .createSignedUrl(upload.data.path, 60);
}

export async function initializeAvatar(avatarFile: any, email: string) {
  return supabase.storage.from('avatars').upload(`pfps/${email}.png`, avatarFile, {
    cacheControl: '3600',
    upsert: false
  });
}

export async function deleteAvatar(email: string) {
  return supabase
    .storage
    .from('avatars')
    .remove([`pfps/${email}.png`]);
}