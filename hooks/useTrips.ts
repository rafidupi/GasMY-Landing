'use client';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebaseConfig';

export interface Trip {
  id: string;
  date: string;
  kilometersTrip: number;
  fuelEfficiency: number;
  fuelCostPerLiter: number;
  litersUsed: number;
  tripCost: number;
  tollCost?: number;
  tagsPassed?: number;
  source?: 'manual' | 'automatic' | 'bluetooth-auto';
  passengerCount?: number;
  tripPath?: Array<{ latitude: number; longitude: number }>;
  tollEvents?: Array<{
    tollName: string;
    priceCLP: number;
    highway?: string;
    timestamp?: string;
    tariffWindow?: 'peak' | 'offPeak' | 'saturated';
  }>;
}

export function useTrips() {
  const { user, loading: authLoading, isConfigured } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isConfigured || !db) {
      setTrips([]);
      setLoading(false);
      return;
    }

    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setTrips([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const tripsRef = collection(db, 'users', user.uid, 'trips');
    const tripsQuery = query(tripsRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(
      tripsQuery,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Trip, 'id'>),
        }));
        setTrips(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, authLoading, isConfigured]);

  return { trips, loading, error };
}
