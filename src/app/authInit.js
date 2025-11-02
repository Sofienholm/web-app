// src/app/authInit.js
// ✅ Kør ved app-start: logger ind anonymt, så request.auth findes i Firestore rules.

import { app } from "./firebase";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    signInAnonymously(auth).catch((err) => {
      console.warn("Anonym login fejlede:", err);
    });
  }
});
