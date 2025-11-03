// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// (valgfrit) import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDb7gf5zzRoiZ8_Nl4yjqShoVwHttnijeo", // indsæt fra Firebase Console
  authDomain: "minkogebog-9a065.firebaseapp.com",
  projectId: "minkogebog-9a065",
  storageBucket: "minkogebog-9a065.appspot.com",
  messagingSenderId: "478821179479",
  appId: "1:478821179479:web:392badc58b22f4c1574312",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export { app }; // <- til anonym login i main.jsx
