import RecipeForm from "./components/RecipeForm";
import { useNavigate } from "react-router";
import styles from "./CreatePage.module.css";

export default function CreatePage() {
  const navigate = useNavigate();

  // trykker “Afslut” (gem opskrift)
  function handleSave(recipeData) {
    console.log("Ny opskrift gemt:", recipeData);
    // TODO: Tilføj Firestore-funktion her senere
    navigate("/"); // Tilbage til forsiden
  }

  // tilbagepil
  function handleBack() {
    navigate("/");
  }

  return (
    <section className={styles.createPage}>
      {/* Tilbagepil */}
      <button onClick={handleBack} className={styles.backBtn}>
        ←
      </button>

      {/* Formular */}
      <RecipeForm onSave={handleSave} />
    </section>
  );
}