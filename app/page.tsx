'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Sparkles, BookOpen, Zap, MapPin } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

// Expanded list for autocomplete and randomizer
const ALL_DESTINATIONS = [
  'Varanasi', 'Kyoto', 'Athens', 'Cairo', 'Machu Picchu', 'Istanbul',
  'Rome', 'Paris', 'Tokyo', 'Petra', 'Jerusalem', 'Angkor Wat', 'Chichen Itza',
  'Venice', 'Havana', 'Marrakech', 'Baghdad', 'Samarkand', 'Cusco', 'Lijiang',
  'Florence', 'Prague', 'Edinburgh', 'Dubrovnik', 'Cartagena', 'Teotihuacan'
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [popularDestinations, setPopularDestinations] = useState<string[]>([]);
  const router = useRouter();

  // Randomize quick links on mount
  useEffect(() => {
    const shuffled = [...ALL_DESTINATIONS].sort(() => 0.5 - Math.random());
    setPopularDestinations(shuffled.slice(0, 6));
  }, []);

  // Filter for autocomplete dropdown
  const suggestions = query.length > 0 
    ? ALL_DESTINATIONS.filter(d => d.toLowerCase().includes(query.toLowerCase()) && d.toLowerCase() !== query.toLowerCase()).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent, directQuery?: string) => {
    e.preventDefault();
    const q = directQuery || query;
    if (q.trim()) {
      router.push(`/results/${encodeURIComponent(q.trim())}`);
    }
  };

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        backgroundColor: 'transparent', // Let layout.tsx handle base colors
      }}
    >
      {/* Interactive 3D/Geometric Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: 'grab' }, resize: true },
            modes: { grab: { distance: 150, links: { opacity: 0.2 } } },
          },
          particles: {
            color: { value: '#c9a84c' },
            links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.05, width: 1 },
            move: { enable: true, random: false, speed: 0.6, straight: false },
            number: { density: { enable: true, area: 800 }, value: 40 },
            opacity: { value: 0.3 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* Main Content Area */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Logo / Brand mark */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ marginBottom: '48px', textAlign: 'center' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #c9a84c, #7c5cbf)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(201,168,76,0.4)',
            }}
          >
            <Globe size={22} color="#fff" />
          </div>
          <span
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Vrinfo
          </span>
        </div>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', fontWeight: 300, letterSpacing: '0.04em' }}>
          Discover the soul of every destination
        </p>
      </motion.div>

      {/* Main hero search — uses layoutId for smooth travel animation */}
      <motion.div
        layoutId="search-bar"
        style={{ width: '100%', maxWidth: '680px', marginBottom: '24px' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <form onSubmit={handleSearch}>
          <div
            style={{
              position: 'relative',
              background: 'rgba(22,22,31,0.85)',
              backdropFilter: 'blur(24px)',
              border: `1.5px solid ${isFocused ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '20px',
              padding: '6px 6px 6px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: isFocused
                ? '0 0 0 4px rgba(201,168,76,0.1), 0 20px 60px rgba(0,0,0,0.4)'
                : '0 20px 60px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            <Search size={20} color={isFocused ? '#c9a84c' : '#5a5a72'} style={{ transition: 'color 0.3s' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search any destination — city, landmark, or region..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '1.0625rem',
                color: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #c9a84c, #b8932a)',
                border: 'none',
                borderRadius: '14px',
                color: '#0a0a0f',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
              }}
            >
              <Sparkles size={16} />
              <span className="hidden sm:inline">Explore</span>
            </motion.button>
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {isFocused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '12px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '8px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  zIndex: 20,
                }}
              >
                {suggestions.map((s, i) => (
                  <div
                    key={s}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent blur
                      setQuery(s);
                      handleSearch(e, s);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'var(--bg-surface)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <MapPin size={16} color="var(--accent-gold)" />
                    <span>{s}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* Quick destination chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', maxWidth: '680px' }}
      >
        {popularDestinations.map((dest) => (
          <motion.button
            key={dest}
            whileHover={{ scale: 1.05, borderColor: 'rgba(201,168,76,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/results/${encodeURIComponent(dest)}`)}
            style={{
              padding: '8px 18px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            {dest}
          </motion.button>
        ))}
      </motion.div>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          marginTop: '64px',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { icon: <BookOpen size={16} />, label: 'Heritage Deep-dive', color: '#c9a84c' },
          { icon: <Zap size={16} />, label: 'Live Pulse', color: '#38b2ac' },
          { icon: <Globe size={16} />, label: 'Smart Itinerary', color: '#7c5cbf' },
        ].map(({ icon, label, color }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color,
              fontSize: '0.875rem',
              fontWeight: 500,
              opacity: 0.85,
            }}
          >
            {icon}
            {label}
          </div>
        ))}
      </motion.div>
      </div>
    </main>
  );
}
