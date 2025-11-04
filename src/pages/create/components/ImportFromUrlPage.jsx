// -- IMPORTS --
import { useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../../services/recipes.firestore.js";
import { getAuth } from "firebase/auth";
import styles from "./ImportFromUrlPage.module.css";

import bgImage from "/assets/home/illu-link.svg";
import backIcon from "/assets/icon/ic-back-symbol.svg";

// -- IMPORT FROM URL PAGE --
// Gør det muligt at importere en opskrift fra et eksternt link via Cloud Function.
// Bruger Firestore til at gemme opskriften og navigerer derefter til detaljer-siden.
export default function ImportFromUrlPage() {
  // -- STATE --
  const [url, setUrl] = useState(""); // URL som brugeren indtaster
  const [loading, setLoading] = useState(false); // viser spinnertekst under import
  const [error, setError] = useState(""); // fejlbesked ved mislykket import
  const navigate = useNavigate();
  const auth = getAuth();

  // -- HANDLE IMPORT --
  // Sender URL’en til en Firebase Cloud Function, parser data, gemmer opskriften i Firestore
  async function handleImport() {
    if (!url.trim()) return; // gør intet hvis feltet er tomt
    setLoading(true);
    setError("");

    try {
      // Kald til Cloud Function med URL som parameter
      const res = await fetch(
        `https://us-central1-minkogebog-9a065.cloudfunctions.net/importRecipeFromUrl?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await res.json();

      // Fejlhåndtering hvis funktionen returnerer fejl
      if (!res.ok || data.error) throw new Error(data.error || "Import fejl");

      // Mapper og formaterer opskriftsdata før den gemmes i Firestore
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
        ownerId: auth.currentUser?.uid || "anon",
      };

      // Gemmer opskriften i Firestore og navigerer til dens detaljeside
      const { id } = await createRecipe(recipe);
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error(" Import fejl:", err);
      setError("Der opstod en fejl ved importen. Prøv igen.");
    } finally {
      setLoading(false);
    }
  }

  // -- RENDER OUTPUT --
  return (
    <div className={styles.page}>
      {/* Tilbage-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButton}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="" className="bubbleIcon" />
      </button>

      {/* Baggrundsillustration */}
      <img src={bgImage} alt="" className={styles.bgImage} />

      {/* Titel */}
      <h1 className={styles.title}>Importer opskrift</h1>

      {/* Formular til URL-input og import-knap */}
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

      {/* Fejlbesked */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
