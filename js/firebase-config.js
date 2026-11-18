// ══════════════════════════════════════════════
// FIREBASE CONFIG — Alex & Jenna Wedding Site
// ══════════════════════════════════════════════
// Replace the placeholder values below with your
// actual Firebase project config.
// See README.md → "Setting Up Firebase Auth" for
// step-by-step instructions.
// ══════════════════════════════════════════════

const firebaseConfig = {
  apiKey:            "AIzaSyCl-6fjjpQOI1T6L-JcI8cAiopavFndX0I",
  authDomain:        "jsan-wedding.firebaseapp.com",
  projectId:         "jsan-wedding",
  storageBucket:     "jsan-wedding.firebasestorage.app",
  messagingSenderId: "893211064929",
  appId:             "1:893211064929:web:4e409852a90c66a257c820"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

// Admin email — this account gets full access automatically
const ADMIN_EMAIL = "aznaimo@gmail.com";
