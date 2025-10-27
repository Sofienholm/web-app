import { useEffect, useState } from "react";
import { searchRecipes } from "../services/recipes.local.js";

const DEFAULT_USER = "demo-user";

export default function useSearchRecipes(query, userId = DEFAULT_USER) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query || query.trim() === "") {
      setResults([]);
      return;
    }

    let alive = true;

    searchRecipes(query, { ownerId: userId }).then((found) => {
      if (alive) setResults(found);
    });

    return () => {
      alive = false;
    };
  }, [query, userId]);

  return results;
}
