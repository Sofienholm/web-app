import { useEffect, useState } from "react";
import { listRecipes } from "../services/recipes.firestore"; // ← Firestore service

const DEFAULT_USER = "demo-user";

/**
 * Henter alle opskrifter for `userId` og filtrerer dem på `tagSlug`.
 * Returnerer et array af opskrifter (samme format som i resten af appen).
 */
export default function useRecipesByTag(tagSlug, userId = DEFAULT_USER) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!tagSlug) {
      setRecipes([]);
      return;
    }

    let alive = true;

    (async () => {
      try {
        // 1) Hent alle opskrifter for brugeren fra Firestore
        const all = await listRecipes({ ownerId: userId });

        // 2) Filtrér på tag (kræver at r.tags er en array af strings)
        const filtered = all.filter(
          (r) => Array.isArray(r.tags) && r.tags.includes(tagSlug)
        );

        if (alive) setRecipes(filtered);
      } catch (err) {
        console.error("useRecipesByTag → Firestore fejl:", err);
        if (alive) setRecipes([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [tagSlug, userId]);

  return recipes;
}
