'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Phone, Accessibility, PersonStanding, ArrowLeft, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api';
import { SafetyInfo } from '@/types';

function SafetyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const location = searchParams.get('q') || '';

    const [data, setData] = useState<SafetyInfo | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location) return;
        setLoading(true);
        api.safety(location).then(setData).catch(console.error).finally(() => setLoading(false));
    }, [location]);

    return (
        <main style={{ minHeight: '100vh', padding: '24px', maxWidth: '860px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={() => router.back()} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Safety Radar</p>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.875rem', color: 'var(--text-primary)' }}>
                        Travel Safety — {location || 'Select a destination'}
                    </h1>
                </div>
            </motion.div>

            {loading && <div style={{ height: 300, borderRadius: '16px', background: 'rgba(22,22,31,0.5)' }} />}

            {data && !loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Emergency Numbers */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="glass-card" style={{ padding: '28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                                <Phone size={18} />
                            </div>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Emergency Numbers</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                            {Object.entries(data.emergency_numbers).map(([key, value]) => (
                                <motion.a key={key} href={`tel:${value}`} whileHover={{ scale: 1.03 }}
                                    style={{ padding: '16px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', textDecoration: 'none', display: 'block', textAlign: 'center', cursor: 'pointer' }}>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>{value}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</p>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Accessibility */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="glass-card" style={{ padding: '28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(56,178,172,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38b2ac' }}>
                                <Accessibility size={18} />
                            </div>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Accessibility Ratings</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { label: 'Wheelchair Accessible', value: data.wheelchair_accessible, icon: <Accessibility size={20} /> },
                                { label: 'Walking Friendly', value: data.walking_friendly, icon: <PersonStanding size={20} /> },
                            ].map(({ label, value, icon }) => (
                                <div key={label} style={{ padding: '20px', background: `rgba(${value ? '56,178,172' : '239,68,68'},0.06)`, border: `1px solid rgba(${value ? '56,178,172' : '239,68,68'},0.2)`, borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ color: value ? '#38b2ac' : '#ef4444', marginBottom: '8px' }}>{icon}</div>
                                    <p style={{ fontSize: '1.125rem', fontWeight: 700, color: value ? '#38b2ac' : '#ef4444' }}>{value ? '✓ Yes' : '✗ Limited'}</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Safety tips */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="glass-card" style={{ padding: '28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c' }}>
                                <AlertTriangle size={18} />
                            </div>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Safety Tips</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {data.safety_tips.map((tip, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.07 }}
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '10px' }}>
                                    <span style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}>✦</span>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tip}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}

export default function SafetyPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading…</div>}>
            <SafetyContent />
        </Suspense>
    );
}
