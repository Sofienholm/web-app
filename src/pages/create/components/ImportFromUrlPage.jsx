import { useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../services/recipes.local"; // din lokale CRUD
import styles from "./ImportFromUrlPage.module.css"; // vi kan lave den bagefter

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
      // kald din Firebase function
      const res = await fetch(
        `https://us-central1-minkogebog-9a065.cloudfunctions.net/importRecipeFromUrl?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // opret opskrift i localStorage
      const id = await createRecipe({
        title: data.title || "Uden titel",
        description: data.description || "",
        ingredients: data.ingredients || [],
        steps: data.steps || [],
        image: data.image || "",
        timeMin: data.time || "",
        tags: data.tags || [],
      });

      // naviger til den nye detail-side
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
          type="text"
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
