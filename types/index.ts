export interface GeoData {
    lat: number;
    lng: number;
    display_name: string;
}

export interface StoryData {
    summary: string;
    full_story: string;
}

export interface GlanceData {
    geography: string;
    government: string;
    recent_events: string;
}

export interface AttractionData {
    name: string;
    description: string;
    type: string;
}

export interface PulseData {
    temperature: number | null;
    weather_description: string | null;
    humidity: number | null;
    crowd_density: string;
    news_headlines: string[];
}

export interface SearchResponse {
    query: string;
    geo: GeoData;
    story: StoryData;
    glance: GlanceData;
    attractions: AttractionData[];
    pulse: PulseData;
    images: string[];
}

export interface DayPlan {
    day: number;
    theme: string;
    morning: string;
    afternoon: string;
    evening: string;
    hotels: string[];
    transit_tips: string;
}

export interface ItineraryData {
    location: string;
    days: DayPlan[];
}

export interface SafetyInfo {
    location: string;
    country: string;
    emergency_numbers: Record<string, string>;
    wheelchair_accessible: boolean;
    walking_friendly: boolean;
    safety_tips: string[];
}
