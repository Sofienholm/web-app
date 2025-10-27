import { useNavigate } from "react-router";
import RecipeForm from "./components/RecipeForm.jsx";
import styles from "./CreatePage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg"; // Vite: brug /assets/...
import Flueben from "/assets/icon/ic-flueben-symbol.svg";
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
      <div className={styles.topButtons}>
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
          onClick={() => navigate("/")}
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>
        <button
          type="submit"
          className={`bubbleButton bubbleGreen bubbleRight ${styles.addButtonFixed}`}
          onClick={() => navigate("/")}
        >
          <img src={Flueben} alt="Rediger" className="bubbleIcon" />
        </button>
      </div>
      <RecipeForm onSave={handleSave} />
    </section>
  );
}