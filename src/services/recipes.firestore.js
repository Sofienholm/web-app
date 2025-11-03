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
import { db } from "../app/firebase"; // behold din init-fil

// Top-level collection: /recipes
const recipesCol = collection(db, "recipes");

// Ensartet mapping af dokument-snapshots → plain objekter
function mapDoc(d) {
  return { id: d.id, ...d.data() };
}

/**
 * Hent en liste af opskrifter.
 * @param {{ ownerId?: string }} [opts]
 * Hvis ownerId er sat, får du kun brugerens opskrifter; ellers alle.
 * Sorteret nyeste først (createdAt desc).
 */
export async function listRecipes({ ownerId } = {}) {
  const constraints = ownerId
    ? [where("ownerId", "==", ownerId), orderBy("createdAt", "desc")]
    : [orderBy("createdAt", "desc")];

  const snap = await getDocs(query(recipesCol, ...constraints));
  return snap.docs.map(mapDoc);
}

/**
 * Hent én opskrift pr. id.
 * Returnerer null hvis dokumentet ikke findes.
 */
export async function getRecipeById(id) {
  const s = await getDoc(doc(recipesCol, id));
  return s.exists() ? mapDoc(s) : null;
}

/**
 * Opret en ny opskrift.
 * Forventer et objekt med felter som title, description, timeMin, servings, tags, image, ownerId, ...
 * Returnerer { id } for det nye dokument.
 */
export async function createRecipe(data) {
  const now = serverTimestamp();
  const ref = await addDoc(recipesCol, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: ref.id }; // ✅ så det matcher destructuring i CreatePage
}


/**
 * Opdater felter på en eksisterende opskrift.
 * patch er et partial-objekt: kun de felter du vil ændre.
 */
export async function updateRecipe(id, patch) {
  await updateDoc(doc(recipesCol, id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Slet en opskrift.
 */
export async function deleteRecipe(id) {
  await deleteDoc(doc(recipesCol, id));
}

/* ---------- Valgfrie helpers (brug dem hvis du har brug for dem) ---------- */

/**
 * Hent opskrifter for en given bruger filtreret på et bestemt tag.
 * Filtrerer i JS efter fetch for at undgå ekstra Firestore-indeks (nemmest i første omgang).
 */
export async function listRecipesByTag(ownerId, tag) {
  const rows = await listRecipes({ ownerId });
  return rows.filter((r) => Array.isArray(r.tags) && r.tags.includes(tag));
}

/**
 * Simpel klientside-søgning på title/description/tags.
 * Brug evt. sammen med listRecipes({ ownerId }).
 */
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
