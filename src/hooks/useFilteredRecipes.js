// -- IMPORTS --
import { useEffect, useState } from "react";
import { listRecipes } from "../services/recipes.firestore"; // Firestore-funktion der henter opskrifter
import filterAndSortRecipes from "../utils/filterAndSortRecipes.js"; // utils-funktion til filtrering/sortering

// -- HOOK: useFilteredRecipes --
// Henter alle opskrifter (evt. kun for én bruger) og filtrerer/sorterer dem
export default function useFilteredRecipes(filters, userId = null) {
  const [out, setOut] = useState([]);

  useEffect(() => {
    let alive = true; // sikrer at vi ikke sætter state hvis komponent unmountes

    (async () => {
      try {
        // hent opskrifter — enten kun brugerens eller alle
        const all = userId
          ? await listRecipes({ ownerId: userId })
          : await listRecipes();

        // filtrér og sorter ift. de aktuelle filtre
        const processed = filterAndSortRecipes(all, filters);

        // kun opdater state hvis komponenten stadig er aktiv
        if (alive) setOut(processed);
      } catch (err) {
        console.error("useFilteredRecipes → Firestore fejl:", err);
        if (alive) setOut([]); // fallback til tom liste
      }
    })();

    // cleanup: afbryd evt. opdatering hvis komponenten unmountes
    return () => {
      alive = false;
    };
  }, [filters, userId]);

  return out;
}
