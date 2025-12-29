# Prompt for Website Developer AI

**Role:** You are an expert Full-Stack Web Developer specializing in React, Next.js, and Firebase.

**Objective:** Build a responsive web dashboard for "GasMy", a trip and toll tracking application. The website allows users to log in with their existing mobile app credentials and view their trip history, costs, and analytics.

**Tech Stack:**
*   **Framework:** Next.js (App Router preferred)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (Dark mode optimized, matching the mobile app's sleek aesthetic)
*   **Backend/Auth:** Firebase (Authentication + Firestore)

## 1. Firebase Configuration
*   Assume a standard Firebase project is already set up.
*   **Auth:** Supports Email/Password and Google Sign-In.
*   **Database:** Firestore.

## 2. Data Structure (Read-Only)
The mobile app syncs data to Firestore at: `users/{userId}/trips/{tripId}`.

**Trip Document Schema (`FuelCalculationHistory`):**
```typescript
interface Trip {
  id: string; // Timestamp-based ID
  date: string; // ISO 8601 string
  kilometersTrip: number; // Distance in km
  fuelEfficiency: number; // km/L
  fuelCostPerLiter: number; // CLP/L
  litersUsed: number;
  tripCost: number; // Estimated fuel cost
  tollCost?: number; // Actual toll cost (if any)
  tagsPassed?: number; // Number of tolls
  source: 'manual' | 'automatic' | 'bluetooth-auto';
  
  // Detailed Path (Array of coordinates)
  tripPath?: Array<{ latitude: number; longitude: number }>;
  
  // Toll Events (List of gantries passed)
  tollEvents?: Array<{
    tollName: string;
    priceCLP: number;
    highway: string;
    timestamp: string;
  }>;
}
```

## 3. Core Features to Implement

### A. Authentication Page
*   Clean, modern login screen.
*   "Sign in with Google" button.
*   "Sign in with Email" form.
*   Redirect to Dashboard upon success.

### B. Dashboard (Home)
*   **Header:** User avatar/name, Logout button.
*   **Summary Cards (Top):**
    *   Total Trips
    *   Total Distance (km)
    *   Total Cost (Fuel + Tolls)
*   **Recent Trips List:**
    *   Display a list of trips sorted by date (newest first).
    *   Each card should show: Date, Time, Distance, Total Cost, and Source (Manual vs Auto).
    *   Use a green checkmark icon for "Auto Saved" trips.

### C. Trip Detail View (Modal or Separate Page)
*   When a user clicks a trip in the list, show details:
    *   **Map Visualization:** Use Leaflet or Mapbox (optional) to plot `tripPath` if available.
    *   **Toll Breakdown:** List all `tollEvents` with their prices and names.
    *   **Cost Analysis:** Show Fuel Cost vs. Toll Cost.

## 4. UI/UX Guidelines
*   **Theme:** Dark mode default (Slate/Gray background `bg-slate-900`, white text).
*   **Accents:** Use a primary blue/cyan for buttons and active states.
*   **Typography:** Inter or similar clean sans-serif font.
*   **Responsiveness:** Must look perfect on mobile web and desktop.

## 5. Implementation Steps
Please generate the code for:
1.  `firebaseConfig.ts` (setup skeleton).
2.  `AuthContext.tsx` (provider for user state).
3.  `hooks/useTrips.ts` (custom hook to subscribe to `users/{uid}/trips`).
4.  `page.tsx` (The main dashboard view).
5.  `components/TripCard.tsx` (Individual trip item).

**Goal:** A functional, production-ready prototype that connects to the existing Firestore data.
