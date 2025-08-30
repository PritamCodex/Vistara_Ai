// File: src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Use environment variables (set in Render or local .env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Google login
export const loginWithGoogle = () => signInWithPopup(auth, provider);

// Email/Password login
export const emailSignup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const emailLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Logout + Auth listener
export const logout = () => signOut(auth);
export const listenAuth = (callback) => onAuthStateChanged(auth, callback);
