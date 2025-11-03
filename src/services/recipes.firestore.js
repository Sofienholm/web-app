// -- IMPORTS --
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../app/firebase"; // Firebase init

// -- REFERENCE --
// Top-level collection: /recipes
const recipesCol = collection(db, "recipes");

// -- HELPER: MAP SNAPSHOT → OBJEKT --
// Konverterer dokument-snapshot til almindeligt objekt med id inkluderet
function mapDoc(d) {
  return { id: d.id, ...d.data() };
}

// -- LIST RECIPES --
// Henter alle opskrifter (eller kun brugerens hvis ownerId er angivet)
// Sorteret efter senest oprettede (createdAt desc)
export async function listRecipes({ ownerId } = {}) {
  const constraints = ownerId
    ? [where("ownerId", "==", ownerId), orderBy("createdAt", "desc")]
    : [orderBy("createdAt", "desc")];

  const snap = await getDocs(query(recipesCol, ...constraints));
  return snap.docs.map(mapDoc);
}

// -- GET RECIPE BY ID --
// Henter én opskrift fra Firestore ud fra id
// Returnerer null hvis dokumentet ikke findes
export async function getRecipeById(id) {
  const s = await getDoc(doc(recipesCol, id));
  return s.exists() ? mapDoc(s) : null;
}

// -- CREATE RECIPE --
// Opretter ny opskrift i Firestore med tidsstempler
// Returnerer et objekt med { id } for det nye dokument
export async function createRecipe(data) {
  const now = serverTimestamp();
  const ref = await addDoc(recipesCol, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: ref.id };
}

// -- UPDATE RECIPE --
// Opdaterer eksisterende opskrift ud fra id
// patch er et objekt med kun de felter, der skal ændres
export async function updateRecipe(id, patch) {
  await updateDoc(doc(recipesCol, id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

// -- DELETE RECIPE --
// Sletter opskrift ud fra id
export async function deleteRecipe(id) {
  await deleteDoc(doc(recipesCol, id));
}

// -- LIST RECIPES BY TAG --
// Returnerer opskrifter fra en given bruger, som indeholder et bestemt tag
// (Filtreres i JS for at undgå ekstra Firestore indeks)
export async function listRecipesByTag(ownerId, tag) {
  const rows = await listRecipes({ ownerId });
  return rows.filter((r) => Array.isArray(r.tags) && r.tags.includes(tag));
}

// -- SEARCH RECIPES --
// Simpel søgning på titel, beskrivelse og tags (klientside)
// Returnerer opskrifter hvor søgeteksten findes i en af felterne
export async function searchRecipes(ownerId, term) {
  const q = (term || "").trim().toLowerCase();
  if (!q) return listRecipes({ ownerId });

  const rows = await listRecipes({ ownerId });

  return rows.filter((r) => {
    const hay = [
      r.title,
      r.description,
      ...(Array.isArray(r.tags) ? r.tags : []),
    ]
      .filter(Boolean)
      .map((s) => String(s).toLowerCase());
    return hay.some((txt) => txt.includes(q));
  });
}
