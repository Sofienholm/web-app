import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../app/firebase";
// import { useAuthUser } from "./useAuthUser";

export function useRecipe(id) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recipes")) || [];
    const found = data.find((r) => r.id === id);
    setRecipe(found);
  }, [id]);

  return recipe;
}