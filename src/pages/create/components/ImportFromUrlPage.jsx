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
     const res = await fetch(
       `https://us-central1-minkogebog-9a065.cloudfunctions.net/importRecipeFromUrl?url=${encodeURIComponent(
         url
       )}`
     );
     const data = await res.json();
     console.log("🔍 Spoonacular data:", data);

     if (!res.ok || data.error) throw new Error(data.error || "Import fejl");

     // 🧩 Normaliser Spoonacular → dit lokale format
     const recipe = {
       title: data.title || "Uden titel",
       description: (
         data.description?.replace(/<[^>]+>/g, "") ||
         data.summary?.replace(/<[^>]+>/g, "") ||
         data.steps?.join(" ") ||
         ""
       )
         .trim()
         .slice(0, 200), // kun første 200 tegn

       image: data.image || "",
       timeMin: data.timeMin ? `${data.timeMin} min` : "",
       servings: data.servings ? `${data.servings} pers.` : "",
       tags: data.tags?.length ? data.tags : ["Importeret opskrift"],

       // 🥄 Ingredienser uden gentagelse af mængde/enhed
       ingredients: (data.ingredients || []).map((i) => ({
         amount:
           i.amount && i.amount % 1 !== 0
             ? i.amount.toFixed(1)
             : i.amount || "",
         unit: i.unit || "",
         name: i.name || i.originalName || "",
       })),

       // 👣 Steps (fanger begge formater)
       steps: data.steps?.length
         ? data.steps.map((s) => s.trim())
         : data.analyzedInstructions?.[0]?.steps?.map((s) => s.step.trim()) ||
           [],
     };

     // 🔹 Gem lokalt
     const id = await createRecipe(recipe);

     // 🔹 Naviger til detaljevisning
     navigate(`/recipe/${id}`);
   } catch (err) {
     console.error("❌ Import fejl:", err);
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
