// src/services/auth.firebase.js
import { auth } from "../app/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { upsertUserProfile } from "./users.firestore";

/** Signup */
export async function signup({ email, password, displayName, avatarUrl = "" }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(user, { displayName });
  await upsertUserProfile(user.uid, {
    displayName: displayName ?? "",
    avatarUrl,
  });
  return user;
}

/** Login */
export async function login({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  // sikr at profil findes
  await upsertUserProfile(user.uid, { displayName: user.displayName ?? "" });
  return user;
}

/** Logout */
export function logout() {
  return signOut(auth);
}

/** Lyt til auth state */
export function subscribeAuth(cb) {
  return onAuthStateChanged(auth, cb);
}
