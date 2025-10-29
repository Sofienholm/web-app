import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecipe } from "../../hooks/useRecipe.js";

// detail-visninger (read-only)
import DetailBasicsSection from "./components/DetailBasicsSection.jsx";
import DetailStepsSection from "./components/DetailStepsSection.jsx";
import DetailIngredientsSheet from "./components/DetailIngredientsSheet.jsx";

// side-styling (matcher CreatePage-stemning)
import styles from "./RecipeDetailPage.module.css";

// ikoner + bobleknapper (samme look som CreatePage)
import backIcon from "/assets/icon/ic-back-symbol.svg";
import editIcon from "/assets/icon/ic-edit-symbol.svg";



export default function RecipeDetailPage() {

  
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipe(id);

  // styrer åbning/lukning af ingrediens-sheet
  const [showIngredients, setShowIngredients] = useState(false);

  if (!recipe) return <p>Indlæser...</p>;

  return (
    <section className={styles.page}>
      {/* Tilbage (venstre) – samme bobleknap som CreatePage */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      {/* Rediger (højre) – fluebenet er erstattet af blyant */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.editButtonFixed}`}
        onClick={() => navigate(`/edit/${id}`)}
        aria-label="Rediger opskrift"
      >
        <img src={editIcon} alt="Rediger" className="bubbleIcon" />
      </button>

      {/* Basics: billede, titel, beskrivelse, tid, portioner, tags + hvidløgs-knap */}
      <DetailBasicsSection
        recipe={recipe}
        onOpenIngredients={() => setShowIngredients(true)}
      />

      {/* Fremgangsmåde: samme kasse som i Create, men read-only og fold-ud */}
      <DetailStepsSection steps={recipe.steps} />

      {/* Ingrediens-sheet: full-screen visning (read-only) */}
      <DetailIngredientsSheet
        open={showIngredients}
        onClose={() => setShowIngredients(false)}
        ingredients={recipe.ingredients}
      />
    </section>
  );
}
