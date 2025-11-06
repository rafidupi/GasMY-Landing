'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token - you'll need to add this to your .env.local
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

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

        // Flatten all gantries from all files
        const allGantries = data.files.flatMap((file) => file.content);
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
    if (!mapContainer.current || !MAPBOX_TOKEN) return;
    if (map.current) return; // Initialize map only once

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-70.65, -33.45], // Santiago, Chile
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Add markers when gantries are loaded
  useEffect(() => {
    if (!map.current || gantries.length === 0) return;

    // Wait for map to load
    map.current.on('load', () => {
      gantries.forEach((gantry) => {
        const [lat, lng] = gantry.coordinate;

        // Create a custom marker element
        const el = document.createElement('div');
        el.className = 'toll-marker';
        el.style.width = '12px';
        el.style.height = '12px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#FF6B00';
        el.style.border = '2px solid #FFFFFF';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: true,
        }).setHTML(`
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #2C2E30;">
              ${gantry.name_display}
            </h3>
            <p style="margin: 0; font-size: 12px; color: #6E757C;">
              ${gantry.highway}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #9DA3AA;">
              ${gantry.lengthKm.toFixed(2)} km
            </p>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });
  }, [gantries]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-ios p-4">
        <p className="text-sm text-red-600">
          <strong>Error:</strong> Mapbox token not configured. Please add
          NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file.
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
        className="w-full h-full rounded-ios overflow-hidden"
        style={{ minHeight: '500px' }}
      />
      
      {!loading && gantries.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-bg-card rounded-ios shadow-lg p-3 z-10">
          <p className="text-xs text-text-mid">
            <span className="font-semibold text-text-strong">{gantries.length}</span> pórticos TAG cargados
          </p>
        </div>
      )}
    </div>
  );
}
