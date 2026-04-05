'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Globe, ArrowLeft, Map, Shield, Calendar } from 'lucide-react';
import { api } from '@/lib/api';
import { SearchResponse } from '@/types';
import PulsePanel from '@/components/chronosync/PulsePanel';
import GlancePanel from '@/components/chronosync/GlancePanel';
import StoryPanel from '@/components/chronosync/StoryPanel';
import AttractionsPanel from '@/components/chronosync/AttractionsPanel';
import ImageGallery from '@/components/chronosync/ImageGallery';
import DestinationMap from '@/components/map/DestinationMap';

interface Props {
    params: Promise<{ query: string }>;
}

export default function ResultsPage({ params }: Props) {
    const { query } = use(params);
    const decodedQuery = decodeURIComponent(query);
    const router = useRouter();

    const [data, setData] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(decodedQuery);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const result = await api.search(decodedQuery);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [decodedQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim() && searchInput.trim() !== decodedQuery) {
            router.push(`/results/${encodeURIComponent(searchInput.trim())}`);
        }
    };

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* ── Sticky Header with animated search bar ── */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    background: 'rgba(10,10,15,0.85)',
                    backdropFilter: 'blur(24px)',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    padding: '14px 24px',
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Back + Brand */}
                    <button
                        onClick={() => router.push('/')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            fontSize: '0.875rem',
                            padding: '6px',
                            borderRadius: '8px',
                            transition: 'color 0.2s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#c9a84c')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        <ArrowLeft size={16} />
                    </button>

                    {/* Logo */}
                    <div
                        onClick={() => router.push('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
                    >
                        <div
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #c9a84c, #7c5cbf)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Globe size={16} color="#fff" />
                        </div>
                        <span
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Vrinfo
                        </span>
                    </div>

                    {/* Animated search bar — layoutId matches Hero page */}
                    <motion.div layoutId="search-bar" style={{ flex: 1, maxWidth: '560px' }}>
                        <form onSubmit={handleSearch}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: 'rgba(22,22,31,0.9)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '8px 8px 8px 14px',
                                }}
                            >
                                <Search size={16} color="var(--text-muted)" />
                                <input
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: '0.9375rem',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'Inter, sans-serif',
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        padding: '7px 18px',
                                        background: 'linear-gradient(135deg, #c9a84c, #b8932a)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#0a0a0f',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Nav links */}
                    <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                        {[
                            { href: `/itinerary?q=${encodeURIComponent(decodedQuery)}`, icon: <Calendar size={15} />, label: 'Itinerary' },
                            { href: `/safety?q=${encodeURIComponent(decodedQuery)}`, icon: <Shield size={15} />, label: 'Safety' },
                        ].map(({ href, icon, label }) => (
                            <button
                                key={label}
                                onClick={() => router.push(href)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '7px 14px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '10px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.8125rem',
                                    cursor: 'pointer',
                                    fontFamily: 'Inter, sans-serif',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = '#c9a84c'; }}
                                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                            >
                                {icon}
                                <span style={{ display: 'none' }} className="sm:inline">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.header>

            {/* ── Main results content ── */}
            <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '32px 24px 64px' }}>

                {/* Location title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '28px' }}
                >
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                        Exploring
                    </p>
                    <h1
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #f0f0f5, #9898b0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {decodedQuery}
                    </h1>
                    {data?.geo.display_name && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            <Map size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                            {data.geo.display_name}
                        </p>
                    )}
                </motion.div>

                {/* Loading state */}
                {loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ width: '100%', height: '340px', borderRadius: '16px', background: 'rgba(22,22,31,0.5)', animation: 'pulse 2s infinite' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ height: '500px', borderRadius: '16px', background: 'rgba(22,22,31,0.5)', animation: 'pulse 2s infinite' }} />
                            <div style={{ height: '500px', borderRadius: '16px', background: 'rgba(22,22,31,0.5)', animation: 'pulse 2s infinite' }} />
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            padding: '32px',
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            borderRadius: '16px',
                            textAlign: 'center',
                        }}
                    >
                        <p style={{ color: '#ef4444', fontSize: '1rem', marginBottom: '8px' }}>Unable to fetch data</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{error}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '12px' }}>
                            Ensure the FastAPI backend is running at {process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}
                        </p>
                    </motion.div>
                )}

                {/* Results */}
                {data && !loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Map view */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <DestinationMap geo={data.geo} locationName={decodedQuery} />
                        </motion.div>

                        {/* ChronoSync Grid: 2 Columns */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                                gap: '20px',
                                alignItems: 'start',
                            }}
                        >
                            <GlancePanel glance={data.glance} />
                            <PulsePanel pulse={data.pulse} />
                        </div>

                        {/* Image Gallery */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                            <ImageGallery images={data.images} />
                        </motion.div>

                        {/* Full Width Story Panel */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <StoryPanel story={data.story} />
                        </motion.div>

                        {/* Full Width Attractions Panel */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <AttractionsPanel attractions={data.attractions} />
                        </motion.div>
                    </div>
                )}
            </div>
        </main>
    );
}
