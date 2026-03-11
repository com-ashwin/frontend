import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import GlobalHeader from '@/components/GlobalHeader';

export const metadata: Metadata = {
  title: 'Vrinfo — AI Heritage & Live-Vibe Travel Companion',
  description:
    'Discover the hidden history and live pulse of any destination. AI-powered cultural deep-dives, real-time weather, local news, and smart itineraries.',
  keywords: 'travel, heritage, AI, history, culture, itinerary, real-time',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Floating ambient glow orbs */}
          <div
            className="glow-orb glow-orb-gold"
            style={{ width: 600, height: 600, top: '-10%', left: '-15%' }}
          />
          <div
            className="glow-orb glow-orb-teal"
            style={{ width: 500, height: 500, bottom: '5%', right: '-10%' }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <GlobalHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
