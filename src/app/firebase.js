// -- IMPORTS --
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// -- FIREBASE KONFIGURATION --
// Projektets credentials fra Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDb7gf5zzRoiZ8_Nl4yjqShoVwHttnijeo",
  authDomain: "minkogebog-9a065.firebaseapp.com",
  projectId: "minkogebog-9a065",
  storageBucket: "minkogebog-9a065.appspot.com",
  messagingSenderId: "478821179479",
  appId: "1:478821179479:web:392badc58b22f4c1574312",
};

// -- INITIALISERING --
const app = initializeApp(firebaseConfig);

// -- EKSPORTERET FIREBASE-INSTANSER --
// bruges på tværs af appen til data, login og filhåndtering
export const db = getFirestore(app); // Firestore database
export const auth = getAuth(app); // Authentication
export const storage = getStorage(app); // Cloud Storage

// bruges fx til anonym login i main.jsx
export { app };
