// pages/detail/EditRecipePage.jsx
import { useNavigate, useParams } from "react-router";
import { useRecipe } from "../../hooks/useRecipe.js";
import { updateRecipe, deleteRecipe } from "../../services/recipes.local.js";
import RecipeForm from "../create/components/RecipeForm.jsx";

import styles from "../create/CreatePage.module.css";

import backIcon from "/assets/icon/ic-back-symbol.svg";
import Flueben from "/assets/icon/ic-flueben-symbol.svg";
import deleteIcon from "/assets/icon/ic-delete-symbol.svg"; // 🗑️ dit ikon

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipe(id);

  if (!recipe) return <p>Indlæser...</p>;

  async function handleUpdate(data) {
    await updateRecipe(id, data);
    navigate(`/recipe/${id}`);
  }

  async function handleDelete() {
    const ok = window.confirm("Er du sikker på, at du vil slette opskriften?");
    if (!ok) return;
    await deleteRecipe(id);
    navigate("/"); // Tilbage til forsiden efter slet
  }

  return (
    <section>
      {/* Tilbage-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      {/* Gem-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.addButtonFixed}`}
        onClick={() => document.querySelector("form")?.requestSubmit()}
        aria-label="Gem ændringer"
      >
        <img src={Flueben} alt="Gem" className="bubbleIcon" />
      </button>

      {/* 🗑️ Slet-knap (med ikon og lidt længere nede) */}
      <button
        type="button"
        className={`bubbleButton bubbleRed bubbleRight ${styles.deleteButtonFixed}`}
        onClick={handleDelete}
        aria-label="Slet opskrift"
      >
        <img src={deleteIcon} alt="Slet" className="bubbleIcon" />
      </button>

      {/* Formular */}
      <RecipeForm onSave={handleUpdate} initialData={recipe} />
    </section>
  );
}
