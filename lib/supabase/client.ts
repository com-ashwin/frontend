import { createBrowserClient } from '@supabase/ssr';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isConfigured =
    !!url &&
    !!key &&
    url !== 'https://your-project.supabase.co' &&
    key !== 'your-anon-key-here';

export function createClient() {
    if (!isConfigured) {
        console.warn('[Supabase] Missing or placeholder credentials — auth features disabled.');
        return null;
    }
    return createBrowserClient(url!, key!);
}
