import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, logEvent, isSupported, Analytics } from 'firebase/analytics';

// Securely load environment variables across Next.js and Vite
const getEnv = (key: string, fallback = '') => {
  if (typeof process !== 'undefined' && process.env && process.env[`NEXT_PUBLIC_${key}`]) {
    return process.env[`NEXT_PUBLIC_${key}`];
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[`VITE_${key}`]) {
    return (import.meta as any).env[`VITE_${key}`];
  }
  return fallback;
};

const apiKey = getEnv('FIREBASE_API_KEY');
const projectId = getEnv('FIREBASE_PROJECT_ID', 'omnistack-b8815');
const appId = getEnv('FIREBASE_APP_ID', '1:528385490625:web:d9f3d0ba76aa6a94a15e40');
const storageBucket = getEnv('FIREBASE_STORAGE_BUCKET', 'omnistack-b8815.firebasestorage.app');
const authDomain = getEnv('FIREBASE_AUTH_DOMAIN', 'omnistack-b8815.firebaseapp.com');
const messagingSenderId = getEnv('FIREBASE_MESSAGING_SENDER_ID', '528385490625');
const measurementId = getEnv('FIREBASE_MEASUREMENT_ID', 'G-8VC78MCKLE');

export const app = apiKey && projectId
  ? (getApps().length === 0
      ? initializeApp({
          apiKey,
          projectId,
          appId,
          storageBucket,
          authDomain,
          messagingSenderId,
          measurementId,
        })
      : getApps()[0])
  : null;

let analyticsInstance: Analytics | null = null;

if (typeof window !== 'undefined' && app) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analyticsInstance = getAnalytics(app);
      }
    })
    .catch(() => {});
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (analyticsInstance) {
    try {
      logEvent(analyticsInstance, eventName, params);
    } catch {
      // safe fallback
    }
  }
}
