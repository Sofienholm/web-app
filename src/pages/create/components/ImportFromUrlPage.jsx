import { useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../../services/recipes.local.js"; // din lokale CRUD
import styles from "./ImportFromUrlPage.module.css";

export default function ImportFromUrlPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleImport() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");

    try {
      // 🔹 kald din Firebase Function med Spoonacular
      const res = await fetch(
        `https://us-central1-minkogebog-9a065.cloudfunctions.net/importRecipeFromUrl?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await res.json();

      if (!res.ok || data.error) throw new Error(data.error || "Import fejl");

      // 🔹 transformer Spoonacular-data → dit lokale dataformat
      const recipe = {
        title: data.title || "Uden titel",
        description:
          data.summary?.replace(/<[^>]+>/g, "") ||
          data.instructions?.slice(0, 200) ||
          "",
        image: data.image || "",
        timeMin: data.readyInMinutes || "",
        servings: data.servings || "",
        ingredients: (data.extendedIngredients || []).map((i) => ({
          amount: i.amount || "",
          unit: i.unit || "",
          name: i.original || i.name || "",
        })),
        steps:
          data.analyzedInstructions?.[0]?.steps?.map((s) => s.step) ||
          (data.instructions ? data.instructions.split(/\n+/) : []),
        tags: data.dishTypes || [],
      };

      // 🔹 gem i localStorage
      const id = await createRecipe(recipe);

      // 🔹 send brugeren til den nye opskrift
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error(err);
      setError("Der opstod en fejl ved importen. Prøv igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Importer opskrift</h1>

      <div className={styles.form}>
        <input
          className={styles.input}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Indsæt link til opskrift..."
        />
        <button
          className={styles.button}
          onClick={handleImport}
          disabled={loading}
        >
          {loading ? "Henter..." : "Importer"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
