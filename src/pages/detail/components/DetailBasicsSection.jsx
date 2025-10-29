
// Viser billedet + titel + beskrivelse + tid + portioner + tags (read-only)
// Matcher layout fra CreatePage, men uden inputs.
import styles from "../RecipeDetailPage.module.css";
import garlicIcon from "/assets/icon/ic-ingredient-symbol.svg";
import { useState } from "react";

export default function DetailBasicsSection({ recipe, onOpenIngredients }) {
  if (!recipe) return null;
const [showFullDesc, setShowFullDesc] = useState(false);
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

      {/* “Ingredienser”-knap (samme placering som på Create) */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.ingredientsButtonPos}`}
        onClick={onOpenIngredients}
        aria-label="Ingredienser"
      >
        <img src={garlicIcon} alt="Ingredienser" className="bubbleIcon" />
      </button>

      {/* Titel */}
      <div className={styles.label}>
        <div className={styles.title} aria-label="Titel">
          {title || "Uden titel"}
        </div>
      </div>

      {/* Beskrivelse (med “Læs mere”) */}
      {description ? (
        <div className={styles.label}>
          <div
            className={`${styles.textarea} ${
              showFullDesc ? styles.expanded : styles.collapsed
            }`}
            aria-label="Beskrivelse"
          >
            {description}
          </div>

          {/* Læs mere / Vis mindre */}
          {description.length > 200 && (
            <button
              type="button"
              className={styles.readMoreBtn}
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? "Vis mindre" : "Læs mere"}
            </button>
          )}
        </div>
      ) : null}

      {/* Tid + Portioner (samme pills, men som tekst) */}
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
