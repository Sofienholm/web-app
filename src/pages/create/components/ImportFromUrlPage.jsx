import { useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../../services/recipes.local.js";
import styles from "./ImportFromUrlPage.module.css";

// baggrundsillustration
import bgImage from "/assets/home/illu-link.svg";
import backIcon from "/assets/icon/ic-back-symbol.svg"; // ← grøn bobleknap ikon

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

      if (!res.ok || data.error) throw new Error(data.error || "Import fejl");

      const recipe = {
        title: data.title || "Uden titel",
        description: (
          data.description?.replace(/<[^>]+>/g, "") ||
          data.summary?.replace(/<[^>]+>/g, "") ||
          data.steps?.join(" ") ||
          ""
        )
          .trim()
          .slice(0, 200),
        image: data.image || "",
        timeMin: data.timeMin ? `${data.timeMin} min` : "",
        servings: data.servings ? `${data.servings} pers.` : "",
        tags: data.tags?.length ? data.tags : ["Importeret opskrift"],
        ingredients: (data.ingredients || []).map((i) => ({
          amount:
            i.amount && i.amount % 1 !== 0
              ? i.amount.toFixed(1)
              : i.amount || "",
          unit: i.unit || "",
          name: i.name || i.originalName || "",
        })),
        steps: data.steps?.length
          ? data.steps.map((s) => s.trim())
          : data.analyzedInstructions?.[0]?.steps?.map((s) => s.step.trim()) ||
            [],
      };

      const id = await createRecipe(recipe);
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
      {/* 🔙 Grøn tilbageknap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButton}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="" className="bubbleIcon" />
      </button>

      {/* 🎨 Baggrundsbillede */}
      <img src={bgImage} alt="" className={styles.bgImage} />

      <h1 className={styles.title}>Importer opskrift</h1>

      <div className={styles.form}>
        <input
          className={styles.input}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Indsæt link her..."
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
