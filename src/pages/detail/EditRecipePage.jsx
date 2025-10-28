import { useNavigate, useParams } from "react-router";
import { useRecipe } from "../../hooks/useRecipe.js";
import { updateRecipe } from "../../services/recipes.local.js";
import RecipeForm from "../create/components/RecipeForm.jsx";

// Samme styling/placering som CreatePage
import styles from "../create/CreatePage.module.css";

import backIcon from "/assets/icon/ic-back-symbol.svg"; // Vite: brug /assets/...
import Flueben from "/assets/icon/ic-flueben-symbol.svg";

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipe(id); // henter initialData fra localStorage

  if (!recipe) return <p>Indlæser...</p>;

  async function handleUpdate(data) {
    // Gem patch i localStorage
    await updateRecipe(id, data);
    // Tilbage til detail-siden for denne opskrift
    navigate(`/recipe/${id}`);
  }

  return (
    <section>
      {/* Tilbage (venstre) – samme bobleknap som CreatePage */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      {/* Gem (højre) – flueben som på CreatePage */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.addButtonFixed}`}
        // Trigger formularens onSubmit i RecipeForm
        onClick={() => document.querySelector("form")?.requestSubmit()}
        aria-label="Gem ændringer"
      >
        <img src={Flueben} alt="Gem" className="bubbleIcon" />
      </button>

      {/* Samme formular som CreatePage, men forudfyldt */}
      <RecipeForm onSave={handleUpdate} initialData={recipe} />
    </section>
  );
}
