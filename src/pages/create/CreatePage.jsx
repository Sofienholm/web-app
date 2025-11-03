// -- IMPORTS --
import { useNavigate } from "react-router";
import RecipeForm from "./components/RecipeForm.jsx";
import styles from "./CreatePage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";
import Flueben from "/assets/icon/ic-flueben-symbol.svg";
import { createRecipe } from "../../services/recipes.firestore.js";
import { auth } from "../../app/firebase";

// -- CREATE PAGE COMPONENT --
export default function CreatePage() {
  const navigate = useNavigate();

  // -- HANDLE SAVE FUNCTION --
  // Kaldes, når brugeren trykker på fluebenet for at gemme opskriften.
  // Sender data videre til Firestore og navigerer derefter til den nye opskrifts detaljeside.
  async function handleSave(data) {
    const user = auth.currentUser;

    // Hvis brugeren ikke er logget ind, vis en advarsel
    if (!user) {
      alert("Du skal være logget ind for at gemme opskrifter.");
      return;
    }

    console.log("Gemmer opskrift for:", user.uid);
    console.log("Data der sendes til Firestore:", data);

    try {
      // Opret ny opskrift i Firestore og få ID’et tilbage
      const { id } = await createRecipe({
        ...data,
        ownerId: user.uid, // vigtig reference til brugerens UID
      });

      console.log("Opskrift oprettet med id:", id);

      // Navigér til den nye opskrifts detaljeside
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error("Fejl ved oprettelse af opskrift:", err);
      alert("Der opstod en fejl ved gemning af opskriften.");
    }
  }

  // -- RENDER OUTPUT --
  // Viser tilbageknap, gemknap og formular-komponenten
  return (
    <section>
      {/* ØVERSTE KNAPPER */}
      <div className={styles.topButtons}>
        {/* Tilbage-knap der fører brugeren til forsiden */}
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
          onClick={() => navigate("/home")}
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>

        {/* Gem-knap der sender formularen */}
        <button
          type="submit"
          className={`bubbleButton bubbleGreen bubbleRight ${styles.addButtonFixed}`}
          onClick={() => document.querySelector("form")?.requestSubmit()}
        >
          <img src={Flueben} alt="Gem" className="bubbleIcon" />
        </button>
      </div>

      {/* RECIPE FORM */}
      {/* RecipeForm håndterer inputs og kalder onSave ved submit */}
      <RecipeForm onSave={handleSave} />
    </section>
  );
}
