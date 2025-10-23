import { useNavigate } from "react-router";
import RecipeForm from "./components/RecipeForm.jsx";
import styles from "./CreatePage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg"; // Vite: brug /assets/...

export default function CreatePage() {
  const navigate = useNavigate();

  function handleSave(recipeData) {
    console.log("Ny opskrift gemt:", recipeData);
    navigate("/"); // senere: skriv til Firestore først
  }

  return (
    <section className={styles.createPage}>
      <div className={styles.topButton}>
        <button
          type="button"
          className={`${styles.profileButton} ${styles.leftButton}`}
          aria-label="Gå til forside"
          onClick={() => navigate("/")}
        >
          <img src={backIcon} alt="Tilbage" className={styles.profileIcon} />
        </button>
      </div>

      <RecipeForm onSave={handleSave} />
    </section>
  );
}
