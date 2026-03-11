'use client';

import { motion } from 'framer-motion';
import { Camera, MapPin } from 'lucide-react';
import { AttractionData } from '@/types';

interface Props {
    attractions: AttractionData[];
}

export default function AttractionsPanel({ attractions }: Props) {
    if (!attractions || attractions.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card"
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-primary)',
                    }}
                >
                    <Camera size={18} />
                </div>
                <div>
                    <h2
                        style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}
                    >
                        Must See
                    </h2>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                        Nearby Attractions
                    </p>
                </div>
            </div>

            {/* Grid of Attractions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {attractions.map((attr, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4, borderColor: 'var(--border-hover)' }}
                        style={{
                            padding: '20px',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{attr.name}</h3>
                            <span style={{ fontSize: '0.7rem', padding: '4px 8px', background: 'var(--bg-elevated)', borderRadius: '100px', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                                {attr.type}
                            </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px' }}>
                            {attr.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto', paddingTop: '12px', color: 'var(--accent-teal)' }}>
                            <MapPin size={12} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Pin to Map</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
