// DetailIngredientsSheet.jsx
import { useEffect, useRef } from "react"; // ← braces!

import styles from "../../create/components/Ingredients.module.css";
import closeIcon from "/assets/icon/ic-add-symbol.svg";

export default function DetailIngredientsSheet({ open, onClose, ingredients }) {
  const panelRef = useRef(null); // ← hooks BEFORE any return

  // Lås baggrundsscroll når sheet er åbent
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouch;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, []);

  if (!open) return null; // ← early return is fine AFTER hooks

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
            <img src={closeIcon} alt="" />
          </button>
          <h2 className={styles.sheetTitle}>INGREDIENSER</h2>
        </div>

        {/* SCROLL-område */}
        <div ref={panelRef} className={styles.panelScroll}>
          <ul className={styles.ingListPills}>
            {list.map((it, i) => (
              <li key={i} className={styles.ingRowPills}>
                <div className={styles.pillGroup}>
                  <input
                    className={`${styles.pill} ${styles.pillAmount}`}
                    type="text"
                    value={it.amount ?? ""}
                    readOnly
                    tabIndex={-1}
                    aria-label="Mængde"
                  />
                  <div className={styles.pillSelect}>
                    <button
                      type="button"
                      className={styles.pillSelectBtn}
                      style={{ pointerEvents: "none" }}
                      aria-disabled="true"
                    >
                      {it.unit || "Enhed"}
                    </button>
                  </div>
                </div>

                <div className={`${styles.pill} ${styles.pillName}`}>
                  <input
                    className={styles.pillNameField}
                    value={it.name ?? ""}
                    readOnly
                    tabIndex={-1}
                    aria-label="Ingrediensnavn"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
