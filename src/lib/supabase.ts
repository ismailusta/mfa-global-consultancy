import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error("Supabase env eksik: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const MEDIA_BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "site-media";

export function publicMediaUrl(path: string) {
  if (!url) return "";
  return `${url.replace(/\/$/, "")}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`;
}
