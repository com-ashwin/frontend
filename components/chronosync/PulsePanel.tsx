'use client';

import { motion } from 'framer-motion';
import { Thermometer, Wind, Users, Newspaper, Activity } from 'lucide-react';
import { PulseData } from '@/types';

interface Props {
    pulse: PulseData;
}

const crowdColors: Record<string, string> = {
    Low: '#22c55e',
    Moderate: '#f59e0b',
    High: '#ef4444',
    'Very High': '#dc2626',
};

const crowdWidth: Record<string, string> = {
    Low: '25%',
    Moderate: '55%',
    High: '80%',
    'Very High': '100%',
};

export default function PulsePanel({ pulse }: Props) {
    const crowdColor = crowdColors[pulse.crowd_density] || '#f59e0b';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card pulse-accent"
            style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        background: 'rgba(56,178,172,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38b2ac',
                    }}
                >
                    <Activity size={18} />
                </div>
                <div>
                    <h2
                        style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            color: '#38b2ac',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}
                    >
                        The Pulse
                    </h2>
                    <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                        Live Conditions
                    </p>
                </div>
            </div>

            {/* Weather card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                    padding: '20px',
                    background: 'rgba(56,178,172,0.06)',
                    border: '1px solid rgba(56,178,172,0.15)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38b2ac', marginBottom: '8px' }}>
                        <Thermometer size={14} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em' }}>Weather</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                        {pulse.temperature != null ? `${pulse.temperature}°C` : 'N/A'}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {pulse.weather_description || 'Data unavailable'}
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38b2ac', marginBottom: '4px' }}>
                        <Wind size={14} />
                        <span style={{ fontSize: '0.8rem' }}>Humidity</span>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {pulse.humidity != null ? `${pulse.humidity}%` : 'N/A'}
                    </p>
                </div>
            </motion.div>

            {/* Crowd density */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    padding: '16px',
                    background: 'rgba(56,178,172,0.04)',
                    border: '1px solid rgba(56,178,172,0.1)',
                    borderRadius: '12px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38b2ac' }}>
                        <Users size={14} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Crowd Density</span>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: crowdColor }}>{pulse.crowd_density}</span>
                </div>
                <div
                    style={{
                        height: '6px',
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                    }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: crowdWidth[pulse.crowd_density] || '50%' }}
                        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                        style={{
                            height: '100%',
                            background: crowdColor,
                            borderRadius: '3px',
                            boxShadow: `0 0 8px ${crowdColor}60`,
                        }}
                    />
                </div>
            </motion.div>

            {/* News headlines */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38b2ac' }}>
                    <Newspaper size={14} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em' }}>Latest Headlines</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pulse.news_headlines.slice(0, 4).map((headline, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.08 }}
                            style={{
                                padding: '12px 16px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '10px',
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'flex-start',
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: '#38b2ac',
                                    marginTop: '6px',
                                    flexShrink: 0,
                                    boxShadow: '0 0 6px #38b2ac80',
                                }}
                            />
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{headline}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
