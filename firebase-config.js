// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8AjoX7obnroRp6yzOjOS2mqRSQ0gJNM8",
  authDomain: "duverse-22caa.firebaseapp.com",
  projectId: "duverse-22caa",
  storageBucket: "duverse-22caa.firebasestorage.app",
  messagingSenderId: "234427814637",
  appId: "1:234427814637:web:d734287438edbf0ccb72e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
