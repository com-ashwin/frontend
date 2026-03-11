'use client';

import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
    images: string[];
}

export default function ImageGallery({ images }: Props) {
    if (!images || images.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
                    <ImageIcon size={18} />
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
                        Visuals
                    </h2>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                        Image Gallery
                    </p>
                </div>
            </div>

            {/* Grid of Images */}
            {/* Layout: 1 large on left, 2 smaller stacked on right, 1 wide on bottom. Flexible depending on arraysize. */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                gridAutoRows: '200px'
            }}>
                {images.map((img, i) => {
                    // Make the first image span 2 columns and 2 rows if space permits
                    const isFeature = i === 0;
                    return (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                gridColumn: isFeature ? 'span 2' : 'span 1',
                                gridRow: isFeature ? 'span 2' : 'span 1',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            }}
                            className="gallery-image-wrapper"
                        >
                            <img
                                src={img}
                                alt={`Location preview ${i + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease',
                                }}
                            />
                            {/* Inner Shadow overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6))',
                                pointerEvents: 'none'
                            }} />
                        </motion.div>
                    );
                })}
            </div>
            <style>{`
                .gallery-image-wrapper:hover img {
                    transform: scale(1.08);
                }
                @media (max-width: 600px) {
                    .gallery-image-wrapper {
                        grid-column: span 1 !important;
                        grid-row: span 1 !important;
                    }
                }
            `}</style>
        </motion.div>
    );
}
