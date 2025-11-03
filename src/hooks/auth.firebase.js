// -- IMPORTS --
import { auth } from "../app/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { upsertUserProfile } from "./users.firestore";

// -- SIGNUP --
// Opretter ny bruger i Firebase Auth og gemmer/opfører profil i Firestore
export async function signup({ email, password, displayName, avatarUrl = "" }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // tilføj displayName hvis det er angivet
  if (displayName) await updateProfile(user, { displayName });

  // sørg for at profil-data gemmes i Firestore
  await upsertUserProfile(user.uid, {
    displayName: displayName ?? "",
    avatarUrl,
  });

  return user;
}

// -- LOGIN --
// Logger eksisterende bruger ind og opretter profil hvis den mangler
export async function login({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  // sikrer at brugerprofil findes i Firestore
  await upsertUserProfile(user.uid, { displayName: user.displayName ?? "" });

  return user;
}

// -- LOGOUT --
// Logger brugeren ud af Firebase
export function logout() {
  return signOut(auth);
}

// -- AUTH STATE LYTTER --
// Kalder callback hver gang login-status ændres (login/logout)
export function subscribeAuth(cb) {
  return onAuthStateChanged(auth, cb);
}
