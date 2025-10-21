import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../app/firebase";
import { useAuthUser } from "./useAuthUser";

export function useRecipe(recipeId) {
  const user = useAuthUser();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (user && recipeId) {
      getDoc(doc(db, "users", user.uid, "recipes", recipeId)).then((snap) =>
        setRecipe(snap.data() || null)
      );
    }
  }, [user, recipeId]);

  return recipe;
}
