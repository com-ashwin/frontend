'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AuthPage() {
    const router = useRouter();
    const supabase = createClient();
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Guard: Supabase not configured (dev mode with placeholder credentials)
        if (!supabase) {
            setMessage({ text: 'Auth is not configured yet. Add real Supabase credentials to .env.local to enable sign-in.', type: 'error' });
            setLoading(false);
            return;
        }

        try {
            if (mode === 'register') {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage({ text: 'Check your email to confirm your account!', type: 'success' });
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push('/');
            }
        } catch (err: unknown) {
            setMessage({ text: err instanceof Error ? err.message : 'Authentication failed', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'flex',
                backgroundColor: 'var(--bg-primary)',
            }}
        >
            {/* Fixed Back Button — always visible, above GlobalHeader layer */}
            <button
                title="Return to home page"
                onClick={() => router.back()}
                style={{
                    position: 'fixed',
                    top: 20,
                    left: 20,
                    zIndex: 200,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'rgba(10,10,15,0.75)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
                <ArrowLeft size={16} />
                <span>Back</span>
            </button>
            {/* Left Side: Immersive Travel Image */}
            <div
                style={{
                    flex: 1,
                    display: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                className="hidden lg:flex"
            >
                {/* High quality travel image from Unsplash Source / Direct URL */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, rgba(10,10,15,0.2), var(--bg-primary))',
                    }}
                />
                
                {/* Explorer Copy */}
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', maxWidth: '80%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 700, color: '#fff', marginBottom: '16px', lineHeight: 1.1, textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
                            Every destination<br />has a story.
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', fontWeight: 300, maxWidth: '400px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                            Join Vrinfo to save your favorite locations, build smart itineraries, and keep a log of your worldly explorations.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Glassmorphism Auth Form */}
            <div
                style={{
                    flex: '1',
                    maxWidth: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* Floating ambient orb for the form side */}
                <div className="glow-orb glow-orb-gold" style={{ width: 400, height: 400, top: '10%', right: '-10%' }} />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: '100%', maxWidth: '420px' }}
                >
                    {/* Logo — no back button here anymore, it's fixed above */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: 34, height: 34, borderRadius: '10px', background: 'linear-gradient(135deg, #c9a84c, #7c5cbf)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}>
                                <Globe size={18} color="#fff" />
                            </div>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.5rem', background: 'linear-gradient(135deg, var(--accent-gold), #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Vrinfo
                            </span>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="glass-card" style={{ padding: '40px' }}>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                            {mode === 'login' ? 'Welcome back, Explorer' : 'Begin your journey'}
                        </h1>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.5 }}>
                            {mode === 'login' ? 'Sign in to access your saved itineraries and hidden histories.' : 'Create an account to unlock the world\'s secrets.'}
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Email */}
                            <div>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: '8px', letterSpacing: '0.02em' }}>Email Address</label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Mail size={16} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
                                    <input
                                        type="email"
                                        title="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="explorer@world.com"
                                        style={{ width: '100%', padding: '14px 14px 14px 44px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', outline: 'none', transition: 'border-color 0.2s' }}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: '8px', letterSpacing: '0.02em' }}>Password</label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Lock size={16} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        title="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        style={{ width: '100%', padding: '14px 44px 14px 44px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', outline: 'none', transition: 'border-color 0.2s' }}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                                    />
                                    <button
                                        type="button"
                                        title={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Message */}
                            <AnimatePresence>
                                {message && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ fontSize: '0.85rem', color: message.type === 'error' ? '#ef4444' : '#22c55e', padding: '12px 16px', background: `rgba(${message.type === 'error' ? '239,68,68' : '34,197,94'},0.08)`, borderRadius: '10px', border: `1px solid rgba(${message.type === 'error' ? '239,68,68' : '34,197,94'},0.2)` }}
                                    >
                                        {message.text}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit"
                                title={mode === 'login' ? "Sign into your account" : "Create a new account"}
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ marginTop: '8px', padding: '16px', background: loading ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg, var(--accent-gold), #b8932a)', border: 'none', borderRadius: '12px', color: '#0a0a0f', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px var(--accent-gold-glow)' }}
                            >
                                {loading ? 'Preparing coordinates…' : mode === 'login' ? 'Unlock Passport' : 'Create Passport'}
                            </motion.button>
                        </form>

                        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '28px' }}>
                            {mode === 'login' ? "Don't have a passport? " : 'Already an explorer? '}
                            <button
                                title={mode === 'login' ? "Switch to sign up" : "Switch to sign in"}
                                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(null); }}
                                style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', fontWeight: 600, fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
                            >
                                {mode === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Inline CSS needed for the exact hidden tailwind class simulation without full config */}
            <style>{`
                @media (min-width: 1024px) {
                    .lg\\:flex { display: flex !important; }
                }
                @media (max-width: 639px) {
                    .hidden.sm\\:inline { display: none; }
                }
            `}</style>
        </main>
    );
}
