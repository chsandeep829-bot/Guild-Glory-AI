import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase Web API keys are public client configuration values.
// Keep Firebase Authentication and Firestore security rules enabled.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDsAwUplm90XLCh-n60XXF1Dz37w8akcYU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'studio-3607214974-ad41a.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'studio-3607214974-ad41a',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'studio-3607214974-ad41a.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '798171833576',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:798171833576:web:99eb4457fd8a96dc4d155d'
};

export const firebaseReady = Boolean(config.apiKey);
const app = firebaseReady ? initializeApp(config) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();