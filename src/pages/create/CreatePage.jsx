import RecipeForm from "./components/RecipeForm";
import { useNavigate } from "react-router";
import styles from "./CreatePage.module.css";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function CreatePage() {
  const navigate = useNavigate();

  // trykker “Afslut” (gem opskrift)
  function handleSave(recipeData) {
    console.log("Ny opskrift gemt:", recipeData);
    // TODO: Tilføj Firestore-funktion her senere
    navigate("/"); // Tilbage til forsiden
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
       

      {/* Formular */}
      <RecipeForm onSave={handleSave} />
    </section>
  );
}