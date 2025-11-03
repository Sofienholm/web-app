import { useEffect, useState } from "react";
import { listRecipes } from "../services/recipes.firestore";
import { getAuth } from "firebase/auth";

/**
 * Henter alle opskrifter for den aktuelle bruger og filtrerer dem på tagSlug.
 */
export default function useRecipesByTag(tagSlug) {
  const [recipes, setRecipes] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid || null;

  useEffect(() => {
    if (!tagSlug) {
      setRecipes([]);
      return;
    }

    let alive = true;

    (async () => {
      try {
        // hent kun brugerens opskrifter
        const all = userId
          ? await listRecipes({ ownerId: userId })
          : await listRecipes();

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
