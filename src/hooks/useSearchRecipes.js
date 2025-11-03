// -- IMPORTS --
import { useEffect, useState } from "react";
import { searchRecipes } from "../services/recipes.firestore"; // Firestore-funktion til søgning
import { getAuth } from "firebase/auth"; // bruges til at hente aktuelt bruger-ID

// -- HOOK: useSearchRecipes --
// Søger i brugerens opskrifter ud fra tekstinput (queryText)
export default function useSearchRecipes(queryText) {
  const [results, setResults] = useState([]); // søgeresultater gemmes her
  const auth = getAuth();
  const userId = auth.currentUser?.uid || null; // ID for den aktuelle bruger (eller null)

  useEffect(() => {
    // trim input — hvis søgetekst er tom, nulstil resultater
    const q = (queryText || "").trim();
    if (!q) {
      setResults([]);
      return;
    }

    let alive = true; // beskytter mod state-opdatering efter unmount

    (async () => {
      try {
        // søg i Firestore (evt. filtreret på bruger)
        const found = await searchRecipes(userId, q);
        if (alive) setResults(found);
      } catch (err) {
        // fejl → vis tom liste i stedet for at crashe
        if (alive) setResults([]);
      }
    })();

    // cleanup for at forhindre race conditions
    return () => {
      alive = false;
    };
  }, [queryText, userId]);

  return results;
}
