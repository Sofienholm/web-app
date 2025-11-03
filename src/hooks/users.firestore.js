// -- IMPORTS --
import { db } from "../app/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// -- UPSERT USER PROFILE --
// Opretter eller opdaterer et dokument i Firestore: users/{uid}
// - Hvis brugeren findes → opdaterer profil + updatedAt
// - Hvis ikke → opretter ny profil med basisfelter
export async function upsertUserProfile(uid, profile) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  // grundstruktur for en ny brugerprofil
  const base = {
    displayName: "",
    avatarUrl: "",
    bio: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (snap.exists()) {
    // opdater eksisterende profil
    await updateDoc(ref, { ...profile, updatedAt: serverTimestamp() });
  } else {
    // opret ny profil
    await setDoc(ref, { ...base, ...profile });
  }
}

// -- GET USER PROFILE --
// Henter profil-data for en given bruger fra Firestore (users/{uid})
export async function getUserProfile(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  // returnér profil med id hvis fundet, ellers null
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
