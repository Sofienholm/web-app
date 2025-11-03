import { useEffect, useState } from "react";
import { searchRecipes } from "../services/recipes.firestore";
import { getAuth } from "firebase/auth";


export default function useSearchRecipes(queryText) {
  const [results, setResults] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid || null;

  useEffect(() => {
    const q = (queryText || "").trim();
    if (!q) {
      setResults([]);
      return;
    }

    let alive = true;

    (async () => {
      try {
        const found = await searchRecipes(userId, q);
        if (alive) setResults(found);
      } catch (err) {
        if (alive) setResults([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [queryText, userId]);

  return results;
}
