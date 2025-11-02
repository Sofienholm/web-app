import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipes.firestore";

export function useRecipe(id) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    let alive = true;
    if (!id) {
      setRecipe(null);
      return;
    }

    (async () => {
      try {
        const data = await getRecipeById(id);
        if (alive) setRecipe(data ?? null);
      } catch (err) {
        console.error("useRecipe → Firestore fejl:", err);
        if (alive) setRecipe(null);
      }
    })();

    return () => {
      // undgå state updates hvis komponenten unmounter midt i async-kald
      alive = false;
    };
  }, [id]);

  return recipe;
}
