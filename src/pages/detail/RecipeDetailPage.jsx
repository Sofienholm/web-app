// -- IMPORTS --
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useRecipe } from "../../hooks/useRecipe.js";

// -- DETAIL-KOMPONENTER (READ-ONLY VISNINGER) --
import DetailBasicsSection from "./components/DetailBasicsSection.jsx";
import DetailStepsSection from "./components/DetailStepsSection.jsx";
import DetailIngredientsSheet from "./components/DetailIngredientsSheet.jsx";

// -- STYLING --
import styles from "./RecipeDetailPage.module.css";

// -- IKONER & KNAPPER --
import backIcon from "/assets/icon/ic-back-symbol.svg";
import editIcon from "/assets/icon/ic-edit-symbol.svg";

// -- RECIPE DETAIL PAGE --
// Viser en fuld visning af en opskrift: billede, beskrivelse, tags, fremgangsmåde og ingredienser.
// Indeholder tilbage- og rediger-knapper samt et separat sheet til ingredienser.
export default function RecipeDetailPage() {
  const { id } = useParams(); // henter opskrift-id fra URL
  const navigate = useNavigate();
  const recipe = useRecipe(id); // henter data for den aktuelle opskrift
  const location = useLocation();

  // Find ud af hvor brugeren kom fra (tilbage-knap skal føre dertil)
  const from = location.state?.from || "/home";

  // Styrer åbning/lukning af ingrediens-sheet
  const [showIngredients, setShowIngredients] = useState(false);

  // Indlæsningstilstand, før opskriften er hentet
  if (!recipe) return <p>Indlæser...</p>;

  // -- RENDER OUTPUT --
  return (
    <section className={styles.page}>
      {/* -- TILBAGE-KNAP (VENSTRE) -- */}
      {/* Samme bobleknap-stil som i CreatePage */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
        onClick={() => navigate(from, { replace: true })}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      {/* -- REDIGER-KNAP (HØJRE) -- */}
      {/* Erstattet flueben med blyant */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.editButtonFixed}`}
        onClick={() =>
          navigate(`/edit/${id}`, { state: { from: location.state?.from } })
        }
        aria-label="Rediger opskrift"
      >
        <img src={editIcon} alt="Rediger" className="bubbleIcon" />
      </button>

      {/* -- BASICS-SEKTION -- */}
      {/* Indeholder billede, titel, beskrivelse, tid, portioner og tags */}
      <DetailBasicsSection
        recipe={recipe}
        onOpenIngredients={() => setShowIngredients(true)}
      />

      {/* -- FREMGANGSMÅDE-SEKTION -- */}
      {/* Read-only version af StepsSection med swipe-funktion */}
      <DetailStepsSection steps={recipe.steps} />

      {/* -- INGREDIENS-SHEET -- */}
      {/* Fullscreen read-only visning af ingredienser */}
      <DetailIngredientsSheet
        open={showIngredients}
        onClose={() => setShowIngredients(false)}
        ingredients={recipe.ingredients}
      />
    </section>
  );
}
