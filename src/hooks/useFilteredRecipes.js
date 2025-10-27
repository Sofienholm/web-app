import { useEffect, useState } from "react";
import { listRecipes } from "../services/recipes.local.js";
import filterAndSortRecipes from "../utils/filterAndSortRecipes.js";

const DEFAULT_USER = "demo-user";

export default function useFilteredRecipes(filters, userId = DEFAULT_USER) {
  const [out, setOut] = useState([]);

  useEffect(() => {
    let alive = true;

    async function run() {
      // hent alle opskrifter for brugeren
      const all = await listRecipes({ ownerId: userId });

      // filtrér og sorter
      const processed = filterAndSortRecipes(all, filters);

      if (alive) {
        setOut(processed);
      }
    }

    run();

    return () => {
      alive = false;
    };
  }, [filters, userId]);

  return out;
}
