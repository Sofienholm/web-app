import { db } from "../app/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export async function createRecipe(userId, recipe) {
  const ref = collection(db, "users", userId, "recipes");
  const docRef = await addDoc(ref, { ...recipe, createdAt: new Date() });
  return docRef.id;
}

export async function getRecipesByUser(userId) {
  const ref = collection(db, "users", userId, "recipes");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateRecipe(userId, recipeId, data) {
  const ref = doc(db, "users", userId, "recipes", recipeId);
  await updateDoc(ref, data);
}

export async function deleteRecipe(userId, recipeId) {
  const ref = doc(db, "users", userId, "recipes", recipeId);
  await deleteDoc(ref);
}
