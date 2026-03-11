import { SearchResponse, ItineraryData, SafetyInfo } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}/api/v1${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `API error ${res.status}`);
    }
    return res.json();
}

export const api = {
    search: (query: string) =>
        apiFetch<SearchResponse>('/search', {
            method: 'POST',
            body: JSON.stringify({ query }),
        }),

    itinerary: (location: string, days: 1 | 3) =>
        apiFetch<ItineraryData>('/itinerary', {
            method: 'POST',
            body: JSON.stringify({ location, days }),
        }),

    safety: (location: string) =>
        apiFetch<SafetyInfo>(`/safety/${encodeURIComponent(location)}`),
};
