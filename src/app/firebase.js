// Importer de nødvendige funktioner fra Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔑 Indsæt jeres egen konfiguration her (fra Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDb7gf5zzRoiZ8_Nl4yjqShoVwHttnijeo",
  authDomain: "minkogebog-9a065.firebaseapp.com",
  databaseURL:
    "https://minkogebog-9a065-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "minkogebog-9a065",
  storageBucket: "minkogebog-9a065.firebasestorage.app",
  messagingSenderId: "478821179479",
  appId: "1:478821179479:web:392badc58b22f4c1574312",
  measurementId: "G-QRL02N8V1H",
};

// 🔥 Initialiser Firebase
const app = initializeApp(firebaseConfig);

// 📦 Eksporter de services, I skal bruge i appen
export const db = getFirestore(app); // Firestore (database)
export const auth = getAuth(app); // Authentication (login)
export const storage = getStorage(app); // Storage (billeduploads)
