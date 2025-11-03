// -- IMPORTS --
import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipes.firestore"; // henter én opskrift fra Firestore via ID

// -- HOOK: useRecipe --
// Henter en enkelt opskrift fra Firestore ud fra det givne ID
export function useRecipe(id) {
  const [recipe, setRecipe] = useState(null); // holder den hentede opskrift

  useEffect(() => {
    let alive = true; // sikrer at vi ikke opdaterer state efter unmount

    if (!id) {
      setRecipe(null);
      return;
    }

    (async () => {
      try {
        // hent opskrift fra Firestore
        const data = await getRecipeById(id);

        // hvis komponent stadig er aktiv → gem data
        if (alive) setRecipe(data ?? null);
      } catch (err) {
        console.error("useRecipe → Firestore fejl:", err);
        if (alive) setRecipe(null); // fallback hvis fejl
      }
    })();

    // cleanup-funktion – stopper evt. state-opdatering hvis komponent unmountes
    return () => {
      alive = false;
    };
  }, [id]);

  return recipe;
}
