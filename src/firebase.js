// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCPv-Q-xBxosVwCAXn6h1d3lYFx9PawF7Q",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tv-residency-578c9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tv-residency-578c9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tv-residency-578c9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "841518069246",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:841518069246:web:0303db9d01b4ee090d3caf",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TVMET8EE0L"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export { app, auth, db };
export default app;
