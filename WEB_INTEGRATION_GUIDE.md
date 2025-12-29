# Web Integration Guide: GasMy Trip Analytics

This guide details how to connect the GasMy web dashboard to the Firebase Firestore database to display user trip analytics.

## 1. Database Architecture

The mobile app syncs user trip data to the following Firestore path:

**Collection:** `users/{userId}/trips`
**Document ID:** `{tripId}` (Timestamp-based ID)

### Security Rules
The current security rules allow a user to read/write only their *own* data.
```javascript
match /users/{userId}/{document=**} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```
*Note: The web app must authenticate the user using Firebase Auth (same account as the mobile app) to access this data.*

## 2. Data Schema (`FuelCalculationHistory`)

Each document in the `trips` collection contains the following fields:

```json
{
  "id": "1735398000000",           // Trip ID (timestamp string)
  "date": "2025-12-28T14:30:00Z",  // ISO 8601 Timestamp
  "kilometersTrip": 15.4,          // Distance in km
  "fuelEfficiency": 12.5,          // km/L
  "fuelCostPerLiter": 1350.0,      // CLP/L
  "litersUsed": 1.23,              // Calculated liters
  "tripCost": 1660.0,              // Estimated fuel cost (CLP)
  "tollCost": 4500.0,              // Actual toll cost (CLP)
  "tagsPassed": 4,                 // Number of gantries passed
  "source": "bluetooth-auto",      // 'manual', 'automatic', or 'bluetooth-auto'
  "passengerCount": 1,             // Number of passengers (for splitting cost)
  
  // Detailed tracking data (if available)
  "tripPath": [
    { "latitude": -33.45, "longitude": -70.66 },
    // ... GPS points for map visualization
  ],
  "tollEvents": [
    {
      "tollId": "p101_vesp_oriente",
      "tollName": "P101 Francisco Bilbao",
      "priceCLP": 233.0,
      "timestamp": "...",
      "tariffWindow": "peak" // 'peak', 'offPeak', 'saturated'
    }
  ]
}
```

## 3. React / Next.js Implementation Example

Here is a ready-to-use React hook to fetch trips for the logged-in user.

### Prerequisites
`npm install firebase`

### Code Snippet (`useTrips.js`)

```javascript
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from './firebaseConfig'; // Your firebase init file

const db = getFirestore(app);
const auth = getAuth(app);

export function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait for auth to initialize
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setTrips([]);
        setLoading(false);
        return;
      }

      // Reference: users/{userId}/trips
      const tripsRef = collection(db, 'users', user.uid, 'trips');
      
      // Query: Order by date descending (newest first)
      const q = query(tripsRef, orderBy('date', 'desc'));

      // Real-time listener
      const unsubscribeData = onSnapshot(q, (snapshot) => {
        const tripsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Helper: convert Firestore Timestamp to JS Date if needed
          // date: doc.data().date.toDate() 
        }));
        
        setTrips(tripsData);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching trips:", err);
        setError(err);
        setLoading(false);
      });

      return () => unsubscribeData();
    });

    return () => unsubscribeAuth();
  }, []);

  return { trips, loading, error };
}
```

### Usage in Component

```javascript
import { useTrips } from '../hooks/useTrips';

export default function Dashboard() {
  const { trips, loading, error } = useTrips();

  if (loading) return <div>Loading trips...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Trips</h1>
      <div className="grid gap-4">
        {trips.map(trip => (
          <div key={trip.id} className="border rounded p-4 shadow-sm bg-white">
            <div className="flex justify-between">
              <span className="font-semibold">{new Date(trip.date).toLocaleDateString()}</span>
              <span className="text-green-600">${trip.totalCost?.toFixed(0) || 0}</span>
            </div>
            <div className="text-gray-600 text-sm mt-2">
              {trip.kilometersTrip.toFixed(1)} km â€¢ {trip.tagsPassed} Tolls
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

