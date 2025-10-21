import { useEffect, useState } from "react";
import { getRecipesByUser } from "../services/recipes";
import { useAuthUser } from "./useAuthUser";

export function useRecipesByUser() {
  const user = useAuthUser();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user) getRecipesByUser(user.uid).then(setRecipes);
  }, [user]);

  return recipes;
}
