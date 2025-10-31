// src/services/users.firestore.js
import { db } from "../app/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/** Opretter eller opdaterer users/{uid} */
export async function upsertUserProfile(uid, profile) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const base = {
    displayName: "",
    avatarUrl: "",
    bio: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (snap.exists()) {
    await updateDoc(ref, { ...profile, updatedAt: serverTimestamp() });
  } else {
    await setDoc(ref, { ...base, ...profile });
  }
}

/** Hent profil */
export async function getUserProfile(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
