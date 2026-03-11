'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Users, Database, AlertTriangle, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminPage() {
    const router = useRouter();
    const supabase = createClient();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [stats, setStats] = useState({ users: '—', searches: '—', cached: '—' });

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push('/auth'); return; }

            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user!.id).single();
            if (profile?.role !== 'admin') { setIsAdmin(false); return; }
            setIsAdmin(true);

            // Load stats
            const [{ count: userCount }, { count: searchCount }, { count: cacheCount }] = await Promise.all([
                supabase.from('profiles').select('*', { count: 'exact', head: true }),
                supabase.from('searches').select('*', { count: 'exact', head: true }),
                supabase.from('heritage_cache').select('*', { count: 'exact', head: true }),
            ]);
            setStats({ users: String(userCount ?? 0), searches: String(searchCount ?? 0), cached: String(cacheCount ?? 0) });
        }
        checkAdmin();
    }, []);

    if (isAdmin === null) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                Checking permissions…
            </div>
        );
    }

    if (isAdmin === false) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: 60, height: 60, borderRadius: '16px', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={28} color="#ef4444" />
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Access Denied</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>You don't have admin privileges.</p>
                <button onClick={() => router.push('/')} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #c9a84c, #b8932a)', border: 'none', borderRadius: '10px', color: '#0a0a0f', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <main style={{ minHeight: '100vh', padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg, #7c5cbf, #c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={22} color="#fff" />
                </div>
                <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Protected Route</p>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.875rem', color: 'var(--text-primary)' }}>Admin Console</h1>
                </div>
            </motion.div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {[
                    { label: 'Total Users', value: stats.users, icon: <Users size={20} />, color: '#38b2ac' },
                    { label: 'Total Searches', value: stats.searches, icon: <Globe size={20} />, color: '#c9a84c' },
                    { label: 'Heritage Cache Entries', value: stats.cached, icon: <Database size={20} />, color: '#7c5cbf' },
                ].map(({ label, value, icon, color }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="glass-card" style={{ padding: '24px' }}>
                        <div style={{ color, marginBottom: '12px' }}>{icon}</div>
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Info banner */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                style={{ padding: '20px 24px', background: 'rgba(124,92,191,0.06)', border: '1px solid rgba(124,92,191,0.2)', borderRadius: '14px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    This admin console shows live stats from your Supabase database. Manage users, clear heritage cache, and review reports directly in your{' '}
                    <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c', textDecoration: 'none' }}>Supabase Dashboard →</a>
                </p>
            </motion.div>
        </main>
    );
}
