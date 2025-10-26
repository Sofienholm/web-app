import { useNavigate } from "react-router";
import RecipeForm from "./components/RecipeForm.jsx";
import styles from "./CreatePage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg"; // Vite: brug /assets/...
import { createRecipe } from "../../services/recipes.local.js";

export default function CreatePage() {
  const navigate = useNavigate();

  async function handleSave(recipeData) {
    // mini-validation (tilpas som du vil)
    if (!recipeData.title?.trim()) {
      alert("Tilføj en titel");
      return;
    }

    const id = await createRecipe(recipeData);
    // vælg selv destination: detalje-rute eller hjem
    // navigate(`/recipe/${id}`);
    navigate("/"); // nu: tilbage til forsiden
  }

  return (
    <section>
      <button
        type="button"
        className={`bubbleButton bubbleRed bubbleLeft ${styles.backButtonFixed}`}
        onClick={() => navigate("/")}
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>
      <RecipeForm onSave={handleSave} />
    </section>
  );
}