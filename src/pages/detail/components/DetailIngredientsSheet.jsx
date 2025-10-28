import styles from "../../create/components/Ingredients.module.css";
import closeIcon from "/assets/icon/ic-add-symbol.svg";

export default function DetailIngredientsSheet({ open, onClose, ingredients }) {
  if (!open) return null;

  const list = Array.isArray(ingredients) ? ingredients : [];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
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

        {/* Liste – samme markup som edit, men inputs er readOnly */}
        <ul className={styles.ingListPills}>
          {list.map((it, i) => (
            <li key={i} className={styles.ingRowPills}>
              <div className={styles.pillGroup}>
                {/* Mængde */}
                <input
                  className={`${styles.pill} ${styles.pillAmount}`}
                  type="text"
                  value={it.amount ?? ""}
                  readOnly
                  tabIndex={-1}
                />

                {/* Enhed */}
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

              {/* Navn – samme pill men input readOnly */}
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
