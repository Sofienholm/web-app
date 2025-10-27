// simple localStorage-CRUD til opskrifter
const KEY = "recipes";

// 🔸 lav et stabilt id-generator fallback
function makeId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  // fallback: timestamp + random suffix
  return Date.now().toString() + "-" + Math.floor(Math.random() * 1e6);
}

// 🔹 Helpers
function readAll() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function writeAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// 🔹 CREATE
export async function createRecipe(data) {
  const id = makeId();
  const doc = {
    id,
    createdAt: Date.now(),
    ownerId: data?.ownerId || "demo-user", // klar til auth senere
    tags: Array.isArray(data?.tags) ? data.tags : [], // fx ["asiatisk", "dessert"]
    ...data,
  };

  const list = readAll();
  list.push(doc);
  writeAll(list);

  return id;
}

// 🔹 READ (én opskrift)
export async function getRecipe(id) {
  return readAll().find((r) => r.id === id) || null;
}

// 🔹 READ (alle opskrifter)
export async function listRecipes({ ownerId } = {}) {
  let all = readAll().sort((a, b) => b.createdAt - a.createdAt);
  if (ownerId) {
    all = all.filter((r) => r.ownerId === ownerId);
  }
  return all;
}

// 🔹 READ (alle med et bestemt tag)
export async function listRecipesByTag(tag, { ownerId } = {}) {
  let all = readAll();
  if (ownerId) {
    all = all.filter((r) => r.ownerId === ownerId);
  }

  return all.filter(
    (r) => Array.isArray(r.tags) && r.tags.includes(tag)
  );
}

// 🔹 SEARCH (simpel tekstsøgning på titel, beskrivelse, ingredienser, tags)
export async function searchRecipes(query, { ownerId } = {}) {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  let all = readAll();
  if (ownerId) {
    all = all.filter((r) => r.ownerId === ownerId);
  }

  return all.filter((r) => {
    const titleHit = r.title?.toLowerCase().includes(term);
    const descHit = r.description?.toLowerCase().includes(term);

    const ingHit = Array.isArray(r.ingredients)
      ? r.ingredients.some((ing) =>
          ing?.name?.toLowerCase().includes(term)
        )
      : false;

    const tagHit = Array.isArray(r.tags)
      ? r.tags.some((tag) =>
          tag?.toLowerCase().includes(term)
        )
      : false;

    return titleHit || descHit || ingHit || tagHit;
  });
}

// 🔹 UPDATE
export async function updateRecipe(id, patch) {
  const list = readAll();
  const i = list.findIndex((r) => r.id === id);
  if (i === -1) return false;

  list[i] = {
    ...list[i],
    ...patch,
    updatedAt: Date.now(),
  };

  writeAll(list);
  return true;
}

// 🔹 DELETE
export async function deleteRecipe(id) {
  const next = readAll().filter((r) => r.id !== id);
  writeAll(next);
  return true;
}
