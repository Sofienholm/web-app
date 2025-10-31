import { useEffect, useRef } from "react";
import styles from "./Ingredients.module.css";
import trashIcon from "/assets/icon/ic-delete-symbol.svg";
import closeIcon from "/assets/icon/ic-add-symbol.svg";
import addIcon from "/assets/icon/ic-add-symbol.svg"; // nyt: bruges til plus-knap

export default function IngredientsSheet({
  open,
  onClose,
  ingredients,
  setIngredients,
}) {
  if (!open) return null;

  const panelRef = useRef(null);

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

  function update(i, patch) {
    const next = [...ingredients];
    next[i] = { ...next[i], ...patch };
    setIngredients(next);
  }

  function addEmpty() {
    setIngredients([...ingredients, { amount: "", unit: "Enhed", name: "" }]);
  }

  function remove(i) {
    setIngredients(ingredients.filter((_, idx) => idx !== i));
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.sheetTopRow}>
          <h2 className={styles.sheetTitle}>INGREDIENSER</h2>
          <button
            type="button"
            className={styles.closeIconBtn}
            onClick={onClose}
            aria-label="Luk"
          >
            <img src={closeIcon} alt="Luk" />
          </button>
        </div>

        {/* SCROLL-område */}
        <div ref={panelRef} className={styles.panelScroll}>
          <ul className={styles.ingListPills}>
            {ingredients.map((it, i) => (
              <li key={i} className={styles.ingRowPills}>
                <div className={styles.pillGroup}>
                  <input
                    className={`${styles.pill} ${styles.pillAmount}`}
                    type="number"
                    inputMode="decimal"
                    value={it.amount ?? ""}
                    onChange={(e) => update(i, { amount: e.target.value })}
                    placeholder="0"
                    aria-label="Mængde"
                  />

                  <div className={styles.pillSelect}>
                    <button
                      type="button"
                      className={styles.pillSelectBtn}
                      onClick={() => update(i, { open: !it.open })}
                      aria-haspopup="listbox"
                      aria-expanded={!!it.open}
                    >
                      {it.unit || "Enhed"}
                    </button>

                    {it.open && (
                      <ul className={styles.dropdown} role="listbox">
                        {["tsk.", "spk.", "g", "kg", "ml", "dl"].map((unit) => (
                          <li
                            key={unit}
                            role="option"
                            onClick={() => update(i, { unit, open: false })}
                          >
                            {unit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className={`${styles.pill} ${styles.pillName}`}>
                  <input
                    className={styles.pillNameField}
                    placeholder={`Ingrediens${
                      ingredients.length > 1 ? ` ${i + 1}` : ""
                    }`}
                    value={it.name ?? ""}
                    onChange={(e) => update(i, { name: e.target.value })}
                    aria-label="Ingrediensnavn"
                  />
                </div>

                <button
                  type="button"
                  className={styles.trashBtn}
                  aria-label="Slet ingrediens"
                  onClick={() => remove(i)}
                  title="Slet"
                >
                  <img src={trashIcon} alt="Slet" />
                </button>
              </li>
            ))}
          </ul>

          {/* Tilføj ny ingrediens */}
          <div className={styles.bigPlusWrap}>
            <button
              type="button"
              className={styles.bigPlusBtn}
              onClick={addEmpty}
              aria-label="Tilføj ingrediens"
              title="Tilføj ingrediens"
            >
              <img src={addIcon} alt="Tilføj" className={styles.addIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
