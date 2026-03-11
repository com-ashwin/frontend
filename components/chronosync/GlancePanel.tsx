'use client';

import { motion } from 'framer-motion';
import { Map, Landmark, Clock } from 'lucide-react';
import { GlanceData } from '@/types';

interface Props {
    glance: GlanceData;
}

export default function GlancePanel({ glance }: Props) {
    const sections = [
        { icon: <Map size={16} />, title: 'Geography', content: glance.geography },
        { icon: <Landmark size={16} />, title: 'Government', content: glance.government },
        { icon: <Clock size={16} />, title: 'Recent Events', content: glance.recent_events },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card echo-accent"
            style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        background: 'rgba(201,168,76,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-gold)',
                    }}
                >
                    <Map size={18} />
                </div>
                <div>
                    <h2
                        style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            color: 'var(--accent-gold)',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}
                    >
                        At a Glance
                    </h2>
                    <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                        Quick Context
                    </p>
                </div>
            </div>

            {/* Content sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                {sections.map(({ icon, title, content }, i) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        style={{
                            padding: '16px',
                            background: 'var(--accent-gold-glow)',
                            borderRadius: '12px',
                            border: '1px solid rgba(201,168,76,0.12)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-gold)' }}>
                            {icon}
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em' }}>{title}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{content}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
