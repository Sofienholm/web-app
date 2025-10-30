// Viser billedet + titel + beskrivelse + tid + portioner + tags (read-only)
// Matcher layout fra CreatePage, men uden inputs.
import { useEffect, useRef, useState } from "react"; // <-- tilføj useRef her
import styles from "../RecipeDetailPage.module.css";
import garlicIcon from "/assets/icon/ic-ingredient-symbol.svg";
import useAutoFitText from "../../../hooks/useAutoFitText";

export default function DetailBasicsSection({ recipe, onOpenIngredients }) {
  if (!recipe) return null;

  const [showDescPopup, setShowDescPopup] = useState(false);
  const titleRef = useRef(null);

  // Lås baggrundsscroll når popup er åben
  useEffect(() => {
    document.body.style.overflow = showDescPopup ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDescPopup]);

  // Auto-fit titlen når den ændrer sig
  useAutoFitText(titleRef, [recipe?.title], {
    max: 1.8,
    min: 1.0,
    step: 0.05,
    unit: "rem",
  });

  const { image, title, description, timeMin, servings, tags } = recipe;

  return (
    <section>
      {/* Billede */}
      <div className={styles.imageBox}>
        {image ? (
          <img className={styles.image} src={image} alt={title || ""} />
        ) : (
          <div className={styles.imagePlaceholder}>🍽</div>
        )}
      </div>

      {/* Ingredienser-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.ingredientsButtonPos}`}
        onClick={onOpenIngredients}
        aria-label="Ingredienser"
      >
        <img src={garlicIcon} alt="Ingredienser" className="bubbleIcon" />
      </button>

      {/* Titel (auto-fit) */}
      <div className={styles.label}>
        <div ref={titleRef} className={styles.title} aria-label="Titel">
          {title || "Uden titel"}
        </div>
      </div>

      {/* Beskrivelse (klik for popup) */}
      {description && (
        <>
          <div className={styles.label}>
            <div
              className={styles.textarea}
              aria-label="Beskrivelse"
              onClick={() => setShowDescPopup(true)}
            >
              {description}
            </div>
          </div>

          {showDescPopup && (
            <div
              className={styles.overlay}
              onClick={() => setShowDescPopup(false)}
            >
              <div
                className={styles.popup}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className={styles.popupTitle}>Beskrivelse</h2>
                <p className={styles.popupText}>{description}</p>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setShowDescPopup(false)}
                >
                  Luk
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Tid + Portioner */}
      <div className={styles.row}>
        <div className={`${styles.number} ${styles.col}`} aria-label="Tid">
          {timeMin || "Ukendt tid"}
        </div>
        <div
          className={`${styles.number} ${styles.col}`}
          aria-label="Portioner"
        >
          {servings ? `${servings} prs.` : "Ukendt antal"}
        </div>
      </div>

      {/* Tags */}
      {Array.isArray(tags) && tags.length > 0 && (
        <>
          <h2 className={styles.tagsTitle}>TAGS</h2>
          <div className={styles.tags}>
            {tags.map((t) => (
              <span key={t} className={`${styles.chip} ${styles.chipActive}`}>
                {t}
              </span>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
