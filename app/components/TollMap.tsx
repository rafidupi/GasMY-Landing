'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Get token from window object (set by script tag) or fallback to build-time env
// This allows runtime configuration on Vercel
const getMapboxToken = () => {
  if (typeof window !== 'undefined' && (window as any).NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (window as any).NEXT_PUBLIC_MAPBOX_TOKEN;
  }
  return 'pk.eyJ1IjoicmFmaWR1cGkiLCJhIjoiY21oZHFuNWZkMDY4MTJtcHAwNTh6czl2biJ9.lGQ9b7REcyBvaiC_Uhjt1g';
};

const MAPBOX_TOKEN = getMapboxToken();

interface TollGantry {
  id: string;
  name: string;
  name_display: string;
  highway: string;
  type: string;
  lengthKm: number;
  coordinate: [number, number]; // [lat, lng]
  polygon: [number, number][];
  pricing: {
    timezone: string;
    categories: {
      [key: string]: {
        offPeakCLP: number;
        peakCLP: number | null;
        saturatedCLP: number | null;
      };
    };
    windows: any[];
  };
}

interface TollFile {
  id: string;
  filename: string;
  content: TollGantry[];
  hash: string;
}

interface TollApiResponse {
  metadata: {
    version: string;
    lastUpdated: string;
    totalFiles: number;
    description: string;
  };
  files: TollFile[];
  cached: boolean;
  timestamp: string;
}

export function TollMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gantries, setGantries] = useState<TollGantry[]>([]);

  // Fetch toll data
  useEffect(() => {
    async function fetchTollData() {
      try {
        const response = await fetch(
          'https://us-central1-gasmy-app.cloudfunctions.net/getTollData'
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: TollApiResponse = await response.json();

        console.log('API Response structure:', {
          filesCount: data.files?.length,
          firstFile: data.files?.[0],
          firstFileContentType: typeof data.files?.[0]?.content,
          firstFileContentIsArray: Array.isArray(data.files?.[0]?.content),
          firstFileContentLength: data.files?.[0]?.content?.length,
        });

        // Flatten all gantries from all files
        // The API returns content as a string, so we need to parse it
        const allGantries = data.files.flatMap((file) => {
          const content = typeof file.content === 'string' 
            ? JSON.parse(file.content) 
            : file.content;
          return content;
        });
        
        console.log('Total gantries loaded:', allGantries.length);
        console.log('Sample gantry:', allGantries[0]);
        console.log('Sample gantry type:', typeof allGantries[0]);
        console.log('Sample gantry is array?:', Array.isArray(allGantries[0]));
        
        setGantries(allGantries);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch toll data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load toll data');
        setLoading(false);
      }
    }

    fetchTollData();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) {
      console.log('Map initialization blocked:', { 
        container: !!mapContainer.current, 
        token: !!MAPBOX_TOKEN 
      });
      return;
    }
    if (map.current) return; // Initialize map only once

    console.log('Initializing Mapbox with token:', MAPBOX_TOKEN);
    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-70.65, -33.45], // Santiago, Chile
        zoom: 10,
      });

      console.log('Map created successfully');

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        console.log('Map loaded successfully');
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
      });
    } catch (error) {
      console.error('Failed to create map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Add markers when gantries are loaded
  useEffect(() => {
    if (!map.current || !gantries || gantries.length === 0) return;

    const addMarkers = () => {
      if (!gantries || !map.current) return;
      
      console.log('Adding markers for', gantries.length, 'gantries');
      console.log('Map loaded?', map.current.loaded());
      
      gantries.forEach((gantry, index) => {
        if (!gantry) {
          console.warn(`Gantry ${index} is null/undefined`);
          return;
        }
        
        console.log(`Gantry ${index} keys:`, Object.keys(gantry));
        console.log(`Gantry ${index} coordinate:`, gantry.coordinate);
        
        if (!gantry.coordinate || !Array.isArray(gantry.coordinate) || gantry.coordinate.length !== 2) {
          console.warn(`Gantry ${index} (${gantry.id}) has invalid coordinates:`, gantry.coordinate);
          return;
        }
        
        const [lat, lng] = gantry.coordinate;
        console.log(`Adding marker ${index}: ${gantry.name_display} at [lat:${lat}, lng:${lng}]`);

        // Mapbox uses [lng, lat] order, but our API returns [lat, lng]
        // Create a custom marker element
        const el = document.createElement('div');
        el.className = 'toll-marker';
        el.style.width = '8px';
        el.style.height = '8px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#3b82f6';
        el.style.border = '1px solid #FFFFFF';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: true,
        }).setHTML(`
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #2C2E30;">
              ${gantry.name_display || gantry.name || 'TAG'}
            </h3>
            <p style="margin: 0; font-size: 12px; color: #6E757C;">
              ${gantry.highway || ''}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #9DA3AA;">
              ${gantry.lengthKm ? gantry.lengthKm.toFixed(2) + ' km' : ''}
            </p>
          </div>
        `);

        // Add marker to map - Mapbox expects [lng, lat] but API returns [lat, lng]
        // So we need to swap: [lat, lng] -> [lng, lat]
        new mapboxgl.Marker(el).setLngLat([lng, lat]).setPopup(popup).addTo(map.current!);
      });
    };

    // Check if map is already loaded
    if (map.current.loaded()) {
      addMarkers();
    } else {
      // Wait for map to load
      map.current.once('load', addMarkers);
    }
  }, [gantries]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-ios p-4">
        <p className="text-sm text-red-600">
          <strong>Error:</strong> Mapbox token not configured.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-ios p-4">
        <p className="text-sm text-red-600">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-main rounded-ios z-10">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-text-mid">Cargando mapa de TAG...</p>
          </div>
        </div>
      )}

      <div
        ref={mapContainer}
        className="w-full h-full rounded-ios overflow-hidden relative z-0"
        style={{ minHeight: '500px' }}
      />

      {!loading && gantries.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-bg-card rounded-ios shadow-lg p-3 z-10">
          <p className="text-xs text-text-mid">
            <span className="font-semibold text-text-strong">{gantries.length}</span> pórticos TAG
            cargados
          </p>
        </div>
      )}
    </div>
  );
}
