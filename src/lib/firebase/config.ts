// Firebase configuration for The Berlin Store
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDBWLKPkxGvG_UNyYPl9izDWmDDYUCZDPk",
  authDomain: "berlin-store-37283.firebaseapp.com",
  projectId: "berlin-store-37283",
  storageBucket: "berlin-store-37283.firebasestorage.app",
  messagingSenderId: "1084041218798",
  appId: "1:1084041218798:web:2a3a8bdf12d7ae33a081ff",
  measurementId: "G-LDX3PCN8HZ"
};

// Initialize Firebase (prevent re-initialization in hot reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics (only in browser)
export const analytics = typeof window !== 'undefined'
  ? isSupported().then(yes => yes ? getAnalytics(app) : null)
  : null;

export default app;
