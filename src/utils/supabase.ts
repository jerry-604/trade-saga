
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
      redirectTo: 'https://trade-saga.vercel.app/home'
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

  const upload = await supabase.storage.from('avatars').upload(`pfps/${session.user.email}.png`, avatarFile, {
    cacheControl: '3600',
    upsert: true
  });

  if (upload.error) {
    return { error: "Could not upload image" };
  }

  return supabase
    .storage
    .from('avatars')
    .createSignedUrl(upload.data.path, 60 * 60 * 24 * 7 * 52 * 10);
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

export async function resetPasswordForEmail(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://trade-saga.vercel.app/updatePassword'
  });
}

export async function updatePassword(newPassword: string) {
  return supabase.auth.updateUser({ password: newPassword });
}