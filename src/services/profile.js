// src/services/profile.js
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../app/firebase"; // <- én kilde til firebase-init

export function onProfileSnapshot(uid, cb) {
  if (!uid) return () => {};
  const ref = doc(db, "users", uid);
  return onSnapshot(ref, (snap) =>
    cb(snap.exists() ? { id: uid, ...snap.data() } : null)
  );
}

export async function getUserProfile(uid) {
  if (!uid) return null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: uid, ...snap.data() } : null;
}

export async function upsertUserProfile(uid, data) {
  if (!uid) return;
  await setDoc(
    doc(db, "users", uid),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
}
