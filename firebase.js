// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFQFkMzU0ZqwUm-U46oObc8YYLOa8wnBw",
  authDomain: "gate-prep-tracker.firebaseapp.com",
  projectId: "gate-prep-tracker",
  // storageBucket: "gate-prep-tracker.firebasestorage.app",
  // messagingSenderId: "203856361148",
  // appId: "1:203856361148:web:931d8b55a531b617a0c2b9",
  // measurementId: "G-3Y1Y9D2FSV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
