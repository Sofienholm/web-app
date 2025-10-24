// simple localStorage-CRUD til opskrifter
const KEY = "recipes";

function readAll() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
function writeAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export async function createRecipe(data) {
  const id = crypto.randomUUID?.() || String(Date.now());
  const doc = { id, createdAt: Date.now(), ...data };
  const list = readAll();
  list.push(doc);
  writeAll(list);
  return id;
}

export async function getRecipe(id) {
  return readAll().find((r) => r.id === id) || null;
}

export async function listRecipes() {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export async function updateRecipe(id, patch) {
  const list = readAll();
  const i = list.findIndex((r) => r.id === id);
  if (i === -1) return false;
  list[i] = { ...list[i], ...patch };
  writeAll(list);
  return true;
}

export async function deleteRecipe(id) {
  writeAll(readAll().filter((r) => r.id !== id));
  return true;
}
