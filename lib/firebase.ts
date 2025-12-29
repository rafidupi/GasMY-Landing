import { getAnalytics, isSupported } from 'firebase/analytics';
import { app, isFirebaseConfigured } from './firebaseConfig';

export async function initAnalytics() {
  if (!isFirebaseConfigured) {
    console.log('Firebase not configured - skipping analytics initialization');
    return null;
  }
  if (typeof window === 'undefined') return null;
  if (!(await isSupported())) return null;
  if (!app) return null;
  return getAnalytics(app);
}
