import { useParams, useNavigate } from "react-router";
import { useRecipe } from "../../hooks/useRecipe";
import { updateRecipe } from "../../services/recipes.local.js";
import RecipeForm from "../create/components/RecipeForm";
import styles from "../create/CreatePage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipe(id);

  async function handleUpdate(data) {
    await updateRecipe(id, data);
    navigate(`/recipe/${id}`);
  }

  if (!recipe) return <p>Indlæser...</p>;

  return (
    <section>
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
        onClick={() => navigate(-1)}
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      <RecipeForm onSave={handleUpdate} initialData={recipe} />
    </section>
  );
}
