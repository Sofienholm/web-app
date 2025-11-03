// -- IMPORTS --
import { useEffect, useState } from "react";
import { listRecipes } from "../services/recipes.firestore"; // henter opskrifter fra Firestore
import { getAuth } from "firebase/auth"; // bruges til at identificere nuværende bruger

// -- HOOK: useRecipesByTag --
// Henter alle opskrifter for den aktuelle bruger og filtrerer dem på et givent tag
export default function useRecipesByTag(tagSlug) {
  const [recipes, setRecipes] = useState([]); // gemmer filtrerede opskrifter
  const auth = getAuth();
  const userId = auth.currentUser?.uid || null; // aktuelt bruger-ID, hvis logget ind

  useEffect(() => {
    // hvis intet tagSlug → returnér tom liste
    if (!tagSlug) {
      setRecipes([]);
      return;
    }

    let alive = true; // beskytter mod state-opdatering efter unmount

    (async () => {
      try {
        // hent kun brugerens opskrifter (eller alle, hvis ingen bruger)
        const all = userId
          ? await listRecipes({ ownerId: userId })
          : await listRecipes();

        // filtrér opskrifter med det valgte tag
        const filtered = all.filter(
          (r) => Array.isArray(r.tags) && r.tags.includes(tagSlug)
        );

        // kun opdater state hvis komponenten stadig er aktiv
        if (alive) setRecipes(filtered);
      } catch (err) {
        console.error("useRecipesByTag → Firestore fejl:", err);
        if (alive) setRecipes([]); // fallback til tom liste
      }
    })();

    // cleanup: stop eventuelle async-opdateringer
    return () => {
      alive = false;
    };
  }, [tagSlug, userId]);

  return recipes;
}
