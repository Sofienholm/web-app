// src/services/recipes.firestore.js
import { db } from "../app/firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit as lim,
} from "firebase/firestore";

// -------- Helpers --------
function colUser(uid) {
  if (!uid) throw new Error("Missing userId/uid for recipes path");
  return collection(db, "users", uid, "recipes");
}
function mapSnap(d) {
  return { id: d.id, ...d.data() };
}

// -------- CREATE --------
export async function createRecipe(userId, data) {
  const ref = await addDoc(colUser(userId), {
    ...data,
    ownerId: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  return { id: ref.id, ...snap.data() };
}

// -------- READ: én opskrift --------
export async function getRecipeById(userId, recipeId) {
  const snap = await getDoc(doc(db, "users", userId, "recipes", recipeId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// -------- READ: alle opskrifter (for en bruger) --------
export async function getRecipesByUser(userId, { limit = 200 } = {}) {
  const q = query(colUser(userId), orderBy("createdAt", "desc"), lim(limit));
  const snap = await getDocs(q);
  return snap.docs.map(mapSnap);
}

// Alias der matcher “listRecipes({ ownerId })”
export async function listRecipes({ ownerId, limit = 200 } = {}) {
  return ownerId ? getRecipesByUser(ownerId, { limit }) : [];
}

// -------- READ: efter tag --------
export async function listRecipesByTag(tag, { ownerId, limit = 200 } = {}) {
  if (!ownerId) return [];
  const q = query(
    colUser(ownerId),
    where("tags", "array-contains", tag),
    orderBy("createdAt", "desc"),
    lim(limit)
  );
  const snap = await getDocs(q);
  return snap.docs.map(mapSnap);
}

// -------- SEARCH (simpel klient-side) --------
export async function searchRecipes(qText, { ownerId, limit = 200 } = {}) {
  const base = await listRecipes({ ownerId, limit });
  const term = (qText || "").trim().toLowerCase();
  if (!term) return base;
  return base.filter((r) => {
    const titleHit = r.title?.toLowerCase().includes(term);
    const descHit = r.description?.toLowerCase().includes(term);
    const ingHit = Array.isArray(r.ingredients)
      ? r.ingredients.some((ing) => ing?.name?.toLowerCase().includes(term))
      : false;
    const tagHit = Array.isArray(r.tags)
      ? r.tags.some((t) => t?.toLowerCase().includes(term))
      : false;
    return titleHit || descHit || ingHit || tagHit;
  });
}

// -------- UPDATE --------
export async function updateRecipe(userId, recipeId, patch) {
  const ref = doc(db, "users", userId, "recipes", recipeId);
  await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
  const snap = await getDoc(ref);
  return { id: snap.id, ...snap.data() };
}

// -------- DELETE --------
export async function deleteRecipe(userId, recipeId) {
  await deleteDoc(doc(db, "users", userId, "recipes", recipeId));
  return true;
}
