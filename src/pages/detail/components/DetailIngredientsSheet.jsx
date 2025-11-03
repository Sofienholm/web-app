// -- IMPORTS --
import styles from "../../create/components/Ingredients.module.css";
import closeIcon from "/assets/icon/ic-add-symbol.svg";

// -- DETAIL INGREDIENTS SHEET COMPONENT --
// Viser en read-only version af ingredienslisten som et overlay på detaljesiden.
// Brugeren kan læse ingredienser, men ikke redigere dem.
export default function DetailIngredientsSheet({ open, onClose, ingredients }) {
  // Luk komponenten helt, hvis den ikke er aktiv
  if (!open) return null;

  // Sikrer, at der altid arbejdes med et array (og ikke null/undefined)
  const list = Array.isArray(ingredients) ? ingredients : [];

  // -- RENDER OUTPUT --
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* -- HEADER -- */}
        <div className={styles.sheetTopRow}>
          <button
            type="button"
            className={styles.closeIconBtn}
            onClick={onClose}
            aria-label="Luk"
          >
            <img src={closeIcon} alt="Luk" className="bubbleIcon" />
          </button>
          <h2 className={styles.sheetTitle}>INGREDIENSER</h2>
        </div>

        {/* -- LISTE AF INGREDIENSER (READ-ONLY) -- */}
        <ul className={styles.ingListPills}>
          {list.map((it, i) => (
            <li key={i} className={styles.ingRowPills}>
              <div className={styles.pillGroup}>
                {/* Mængdefelt (kun læsbar) */}
                <input
                  className={`${styles.pill} ${styles.pillAmount}`}
                  type="text"
                  value={it.amount ?? ""}
                  readOnly
                  tabIndex={-1}
                />

                {/* Enhedsfelt (kun læsbar) */}
                <div className={styles.pillSelect}>
                  <button
                    type="button"
                    className={styles.pillSelectBtn}
                    style={{ pointerEvents: "none" }}
                  >
                    {it.unit || "Enhed"}
                    <span className={styles.arrow}></span>
                  </button>
                </div>
              </div>

              {/* Navn på ingrediens (kun læsbar) */}
              <div className={`${styles.pill} ${styles.pillName}`}>
                <input
                  className={styles.pillNameField}
                  value={it.name ?? ""}
                  readOnly
                  tabIndex={-1}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
