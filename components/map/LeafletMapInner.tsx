'use client';

import { useEffect, useRef } from 'react';
import { GeoData } from '@/types';

interface Props {
    geo: GeoData;
    locationName: string;
}

export default function LeafletMapInner({ geo, locationName }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    // Keep the map instance in a ref so we can destroy it on unmount
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Dynamically import Leaflet so it never runs on the server
        let isMounted = true;

        import('leaflet').then((L) => {
            if (!isMounted || !containerRef.current) return;

            // Inject Leaflet CSS once
            if (!document.querySelector('link[href*="leaflet"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);
            }

            // Destroy any existing map on this node (handles StrictMode double-mount)
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }

            // Create map
            const map = L.map(containerRef.current, {
                center: [geo.lat, geo.lng],
                zoom: 10,
                zoomControl: true,
                scrollWheelZoom: false,
            });

            mapRef.current = map;

            // CartoDB DarkMatter — dark tiles, no API key needed
            L.tileLayer(
                'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    subdomains: 'abcd',
                    maxZoom: 20,
                }
            ).addTo(map);

            // Custom gold pin marker
            const customIcon = L.divIcon({
                className: '',
                html: `<div style="
                    width: 32px; height: 32px;
                    background: linear-gradient(135deg, #c9a84c, #b8932a);
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    box-shadow: 0 0 20px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.3);
                    border: 2px solid rgba(255,255,255,0.3);
                "></div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -36],
            });

            // Marker + popup
            L.marker([geo.lat, geo.lng], { icon: customIcon })
                .addTo(map)
                .bindPopup(
                    `<div style="font-family: Inter, sans-serif; padding: 4px;">
                        <strong style="color: #c9a84c; font-size: 1rem;">${locationName}</strong>
                        <br/>
                        <span style="font-size: 0.75rem; color: #9898b0;">
                            ${geo.lat.toFixed(4)}°N, ${geo.lng.toFixed(4)}°E
                        </span>
                    </div>`,
                    { maxWidth: 220 }
                )
                .openPopup();

            // Smooth fly-in
            setTimeout(() => {
                if (mapRef.current) {
                    map.flyTo([geo.lat, geo.lng], 13, {
                        duration: 1.5,
                        easeLinearity: 0.25,
                    });
                }
            }, 300);
        });

        // Cleanup — this runs before the second StrictMode mount AND on unmount
        return () => {
            isMounted = false;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [geo.lat, geo.lng, locationName]);

    return (
        <div
            style={{
                width: '100%',
                height: '340px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(201,168,76,0.2)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
        >
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
