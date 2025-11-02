import { useEffect, useState } from "react";
import { searchRecipes } from "../services/recipes.firestore"; // ← Firestore-service

const DEFAULT_USER = "demo-user";

export default function useSearchRecipes(queryText, userId = DEFAULT_USER) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = (queryText || "").trim();
    if (!q) {
      setResults([]);
      return;
    }

    let alive = true;

    (async () => {
      try {
        // Firestore → hent brugerens opskrifter og filtrér på title/description/tags
        const found = await searchRecipes(userId, q);
        if (alive) setResults(found);
      } catch (err) {
        console.error("useSearchRecipes → Firestore fejl:", err);
        if (alive) setResults([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [queryText, userId]);

  return results;
}
