'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { StoryData } from '@/types';

interface Props {
    story: StoryData;
}

export default function StoryPanel({ story }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card"
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg,rgba(124,92,191,0.2),rgba(201,168,76,0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-purple)',
                    }}
                >
                    <BookOpen size={18} />
                </div>
                <div>
                    <h2
                        style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            color: 'var(--accent-purple)',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}
                    >
                        Heritage & Lore
                    </h2>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Playfair Display, serif' }}>
                        The Story
                    </p>
                </div>
            </div>

            {/* Hook Summary */}
            <p style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif', borderLeft: '3px solid var(--accent-gold)', paddingLeft: '16px', lineHeight: 1.6 }}>
                "{story.summary}"
            </p>

            {/* Full Story HTML */}
            <div 
                className="story-content"
                style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '8px' }}
                dangerouslySetInnerHTML={{ __html: story.full_story }}
            />
            
            <style>{`
                .story-content p {
                    margin-bottom: 16px;
                }
                .story-content strong {
                    color: var(--text-primary);
                    font-weight: 600;
                }
                .story-content em {
                    color: var(--accent-purple);
                    font-style: italic;
                }
            `}</style>
        </motion.div>
    );
}
