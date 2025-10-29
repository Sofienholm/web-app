import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecipe } from "../../hooks/useRecipe.js";

import DetailBasicsSection from "./components/DetailBasicsSection.jsx";
import DetailStepsSection from "./components/DetailStepsSection.jsx";
import DetailIngredientsSheet from "./components/DetailIngredientsSheet.jsx";

import styles from "./RecipeDetailPage.module.css";

import backIcon from "/assets/icon/ic-back-symbol.svg";
import editIcon from "/assets/icon/ic-edit-symbol.svg";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipe(id);

  const [showIngredients, setShowIngredients] = useState(false);

  if (!recipe) return <p>Indlæser...</p>;

  // recipe.image kan være fra kameraet (dataURL)
  // recipe.tips kan være en array af strings fra done-siden
  const safeTips = Array.isArray(recipe.tips) ? recipe.tips : [];

  return (
    <section className={styles.page}>
      {/* Tilbage-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      {/* Rediger (klassisk edit af opskrift) */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.editButtonFixed}`}
        onClick={() => navigate(`/edit/${id}`)}
        aria-label="Rediger opskrift"
      >
        <img src={editIcon} alt="Rediger" className="bubbleIcon" />
      </button>

      {/* Basics: billede, titel, beskrivelse, tid, portioner, tags + hvidløg */}
      <DetailBasicsSection
        recipe={recipe}
        onOpenIngredients={() => setShowIngredients(true)}
        // vi forudsætter at DetailBasicsSection bruger recipe.image til hero billedet,
        // så det nye billede fra done-siden vises automatisk
      />

      {/* Ekstra sektion for tips, lige under tags-lignende stil */}
      {safeTips.length > 0 && (
        <div className={styles.tipsBlock}>
          <h3 className={styles.tipsTitle}>DINE TIPS</h3>
          <div className={styles.tags}>
            {safeTips.map((t, i) => (
              <div key={i} className={styles.tag}>
                {t || "Tip"}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fremgangsmåde / swipe-up modul */}
      <DetailStepsSection steps={recipe.steps} />

      {/* Ingrediens-sheet */}
      <DetailIngredientsSheet
        open={showIngredients}
        onClose={() => setShowIngredients(false)}
        ingredients={recipe.ingredients}
      />

      {/* Knap nederst som før kunne være "Rediger" – vi skifter til "Færdig med opskriften?" */}
      <button
        type="button"
        className={styles.editBtn}
        onClick={() => navigate(`/recipe/${id}/done`)}
      >
        Færdig med retten
      </button>
    </section>
  );
}
