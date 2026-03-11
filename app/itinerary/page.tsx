'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, Hotel, Train, ArrowLeft, Globe } from 'lucide-react';
import { api } from '@/lib/api';
import { ItineraryData } from '@/types';

function ItineraryContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const location = searchParams.get('q') || '';

    const [data, setData] = useState<ItineraryData | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedDays, setSelectedDays] = useState<1 | 3>(1);

    const fetchItinerary = async (days: 1 | 3) => {
        if (!location) return;
        setLoading(true);
        try {
            const result = await api.itinerary(location, days);
            setData(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location) fetchItinerary(selectedDays);
    }, [location]);

    return (
        <main style={{ minHeight: '100vh', padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={() => router.back()} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Itinerary Builder</p>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {location || 'Choose a destination'}
                    </h1>
                </div>
            </motion.div>

            {/* Day selector */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
                {([1, 3] as const).map((d) => (
                    <motion.button
                        key={d}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setSelectedDays(d); fetchItinerary(d); }}
                        style={{
                            padding: '10px 28px',
                            borderRadius: '12px',
                            border: `1.5px solid ${selectedDays === d ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                            background: selectedDays === d ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                            color: selectedDays === d ? '#c9a84c' : 'var(--text-secondary)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s',
                        }}
                    >
                        {d} Day{d > 1 ? 's' : ''}
                    </motion.button>
                ))}
            </div>

            {/* Loading */}
            {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2].map((i) => (
                        <div key={i} style={{ height: '200px', borderRadius: '16px', background: 'rgba(22,22,31,0.5)' }} />
                    ))}
                </div>
            )}

            {!location && !loading && (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                    <Globe size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                    <p>Search for a destination first to build your itinerary.</p>
                    <button onClick={() => router.push('/')} style={{ marginTop: '16px', padding: '10px 24px', background: 'linear-gradient(135deg, #c9a84c, #b8932a)', border: 'none', borderRadius: '10px', color: '#0a0a0f', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Go to Search</button>
                </div>
            )}

            {/* Itinerary days */}
            {data && !loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data.days.map((day, i) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="glass-card"
                            style={{ padding: '28px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #7c5cbf)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '0.9375rem' }}>
                                    {day.day}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Day {day.day}</p>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{day.theme}</h3>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                                {[
                                    { label: 'Morning', content: day.morning, color: '#f59e0b' },
                                    { label: 'Afternoon', content: day.afternoon, color: '#c9a84c' },
                                    { label: 'Evening', content: day.evening, color: '#7c5cbf' },
                                ].map(({ label, content, color }) => (
                                    <div key={label} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${color}25` }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color }}>
                                            <Clock size={13} />
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{content}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '200px', padding: '12px 16px', background: 'rgba(201,168,76,0.05)', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.15)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c9a84c', marginBottom: '6px' }}>
                                        <Hotel size={13} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Hotels</span>
                                    </div>
                                    {day.hotels.map((h) => <p key={h} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>• {h}</p>)}
                                </div>
                                <div style={{ flex: 1, minWidth: '200px', padding: '12px 16px', background: 'rgba(56,178,172,0.05)', borderRadius: '10px', border: '1px solid rgba(56,178,172,0.15)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38b2ac', marginBottom: '6px' }}>
                                        <Train size={13} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Transit Tips</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{day.transit_tips}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default function ItineraryPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading…</div>}>
            <ItineraryContent />
        </Suspense>
    );
}
