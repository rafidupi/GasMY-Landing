'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use environment variable with fallback
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  throw new Error('Mapbox token no configurado');
}

mapboxgl.accessToken = MAPBOX_TOKEN;

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
          const content =
            typeof file.content === 'string' ? JSON.parse(file.content) : file.content;
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
        token: !!MAPBOX_TOKEN,
      });
      return;
    }
    if (map.current) return; // Initialize map only once

    console.log('Initializing Mapbox with token:', MAPBOX_TOKEN);
    mapboxgl.accessToken = MAPBOX_TOKEN!;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
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
        setError('Failed to load map tiles');
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

  // Add GeoJSON layer for toll points from KML file
  useEffect(() => {
    if (!map.current) return;

    const addGeoJsonLayer = () => {
      if (!map.current) return;

      // Add the GeoJSON source
      map.current.addSource('additional-tolls', {
        type: 'geojson',
        data: '/tolls.geojson',
      });

      // Add a circle layer for point features
      map.current.addLayer({
        id: 'toll-points-layer',
        type: 'circle',
        source: 'additional-tolls',
        filter: ['==', '$type', 'Point'],
        paint: {
          'circle-radius': 4,
          'circle-color': '#2548df',
          'circle-stroke-width': 0.5,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.8,
        },
      });

      // Add click event to show popup
      map.current.on('click', 'toll-points-layer', (e) => {
        if (!e.features || e.features.length === 0) return;

        const coordinates = (e.features[0].geometry as any).coordinates.slice();
        const properties = e.features[0].properties;

        // Ensure popup appears over the correct point
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 8px;">
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #2C2E30;">
                ${properties?.name || 'Peaje'}
              </h3>
            </div>
          `
          )
          .addTo(map.current!);
      });

      // Change cursor on hover
      map.current.on('mouseenter', 'toll-points-layer', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'toll-points-layer', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    };

    if (map.current.loaded()) {
      addGeoJsonLayer();
    } else {
      map.current.once('load', addGeoJsonLayer);
    }
  }, []);

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
        className="w-full h-full rounded-ios overflow-hidden"
        style={{ minHeight: '500px', height: '500px' }}
      />
    </div>
  );
}
