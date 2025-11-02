import { useNavigate } from "react-router";
import RecipeForm from "./components/RecipeForm.jsx";
import styles from "./CreatePage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg"; // Vite: brug /assets/...
import Flueben from "/assets/icon/ic-flueben-symbol.svg";
import { createRecipe } from "../../services/recipes.firestore.js";
import { auth } from "../../app/firebase";



export default function CreatePage() {
  const navigate = useNavigate();


async function handleSave(data) {
  const uid = auth.currentUser?.uid || "anon";
  const { id } = await createRecipe({ ...data, ownerId: uid });
  navigate(`/recipe/${id}`);
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
          onClick={() => document.querySelector("form")?.requestSubmit()}
        >
          <img src={Flueben} alt="Rediger" className="bubbleIcon" />
        </button>
      </div>
      <RecipeForm onSave={handleSave} />
    </section>
  );
}