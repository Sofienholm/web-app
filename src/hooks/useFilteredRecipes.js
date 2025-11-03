import { useEffect, useState } from "react";
import { listRecipes } from "../services/recipes.firestore"; // Firestore service
import filterAndSortRecipes from "../utils/filterAndSortRecipes.js";

/**
 * Henter alle opskrifter for userId og filtrerer/sorterer dem.
 */
export default function useFilteredRecipes(filters, userId = null) {
  const [out, setOut] = useState([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // 🔹 Hent alle opskrifter (kun brugerens hvis userId findes)
        const all = userId
          ? await listRecipes({ ownerId: userId })
          : await listRecipes();

        // 🔹 Filtrér og sorter
        const processed = filterAndSortRecipes(all, filters);

        if (alive) setOut(processed);
      } catch (err) {
        console.error("useFilteredRecipes → Firestore fejl:", err);
        if (alive) setOut([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [filters, userId]);

  return out;
}
