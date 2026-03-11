import { createBrowserClient } from '@supabase/ssr';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured =
    url &&
    key &&
    url !== 'https://your-project.supabase.co' &&
    key !== 'your-anon-key-here';

export function createClient() {
    if (!isConfigured) {
        // Return null-safe stub so pages don't crash during development.
        // Replace env vars in .env.local with your real Supabase credentials.
        console.warn('[Supabase] Missing or placeholder credentials — auth features disabled.');
        return null as any;
    }
    return createBrowserClient(url!, key!);
}
