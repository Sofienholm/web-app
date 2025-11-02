import { useEffect, useState } from "react";
import { listRecipes } from "../services/recipes.firestore"; // ← Firestore-service
import filterAndSortRecipes from "../utils/filterAndSortRecipes.js";

const DEFAULT_USER = "demo-user";

export default function useFilteredRecipes(filters, userId = DEFAULT_USER) {
  const [out, setOut] = useState([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // 1) Hent alle opskrifter for den givne bruger (Firestore)
        const all = await listRecipes({ ownerId: userId });

        // 2) Filtrér og sorter med din eksisterende util
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
