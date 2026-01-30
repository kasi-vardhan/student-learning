// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3n0S7-zUmZaEIvy4ZrG5Xx4DKsXCjaHk",
    authDomain: "student-learning-segments.firebaseapp.com",
    projectId: "student-learning-segments",
    storageBucket: "student-learning-segments.firebasestorage.app",
    messagingSenderId: "950475985285",
    appId: "1:950475985285:web:8d607e83e80765ef0474ec",
    measurementId: "G-9V5DDJ1ETB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
export default app;
