// -- IMPORTS --
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../app/firebase"; // fælles Firebase-init

// -- ON PROFILE SNAPSHOT --
// Lytter live på ændringer i en brugers profil (users/{uid})
// Kalder callback-funktionen 'cb' med ny profil-data hver gang dokumentet ændres
export function onProfileSnapshot(uid, cb) {
  if (!uid) return () => {}; // hvis intet UID, returnér tom cleanup-funktion

  const ref = doc(db, "users", uid);

  return onSnapshot(ref, (snap) =>
    cb(snap.exists() ? { id: uid, ...snap.data() } : null)
  );
}

// -- GET USER PROFILE --
// Henter en brugers profil én gang fra Firestore (users/{uid})
// Returnerer null hvis profil ikke findes
export async function getUserProfile(uid) {
  if (!uid) return null;

  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: uid, ...snap.data() } : null;
}

// -- UPSERT USER PROFILE --
// Opretter eller opdaterer en brugerprofil (users/{uid})
// merge:true bevarer eksisterende felter i dokumentet
export async function upsertUserProfile(uid, data) {
  if (!uid) return;

  await setDoc(
    doc(db, "users", uid),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
}
