'use client';

import dynamic from 'next/dynamic';
import { GeoData } from '@/types';

interface Props {
    geo: GeoData;
    locationName: string;
}

// CRITICAL: Leaflet uses window, must be loaded client-side only
const LeafletMap = dynamic(() => import('./LeafletMapInner'), {
    ssr: false,
    loading: () => (
        <div
            style={{
                width: '100%',
                height: '340px',
                borderRadius: '16px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
            }}
        >
            Loading map…
        </div>
    ),
});



export default function DestinationMap({ geo, locationName }: Props) {
    return <LeafletMap geo={geo} locationName={locationName} />;
}
