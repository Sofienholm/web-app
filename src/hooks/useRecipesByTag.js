import { useEffect, useState } from "react";
import { listRecipesByTag } from "../services/recipes.local.js";


const DEFAULT_USER = "demo-user";

export default function useRecipesByTag(tagSlug, userId = DEFAULT_USER) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!tagSlug) {
      setRecipes([]);
      return;
    }

    let alive = true;

    listRecipesByTag(tagSlug, { ownerId: userId }).then((all) => {
      if (alive) setRecipes(all);
    });

    return () => {
      alive = false;
    };
  }, [tagSlug, userId]);

  return recipes;
}
