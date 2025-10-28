import styles from "./Ingredients.module.css";
import trashIcon from "/assets/icon/ic-delete-symbol.svg";
import closeIcon from "/assets/icon/ic-add-symbol.svg";


export default function IngredientsSheet({
  open,
  onClose,
  ingredients,
  setIngredients,
}) {
  if (!open) return null;

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
          <button
            type="button"
            className={styles.closeIconBtn}
            onClick={onClose}
          >
            <img src={closeIcon} alt="Tilbage" className="bubbleIcon" />
          </button>
          <h2 className={styles.sheetTitle}>INGREDIENSER</h2>
        </div>

        {/* Rækker */}
        <ul className={styles.ingListPills}>
          {ingredients.map((it, i) => (
            <li key={i} className={styles.ingRowPills}>
              <div className={styles.pillGroup}>
                <input
                  className={`${styles.pill} ${styles.pillAmount}`}
                  type="number"
                  value={it.amount ?? ""}
                  onChange={(e) => update(i, { amount: e.target.value })}
                />
                <div className={styles.pillSelect}>
                  <button
                    type="button"
                    className={styles.pillSelectBtn}
                    onClick={() => update(i, { open: !it.open })}
                  >
                    {it.unit || "Enhed"} <span className={styles.arrow}></span>
                  </button>

                  {it.open && (
                    <ul className={styles.dropdown}>
                      {["tsk.", "spk.", "g", "kg", "ml", "dl"].map((unit) => (
                        <li
                          key={unit}
                          onClick={() => {
                            update(i, { unit, open: false });
                          }}
                        >
                          {unit}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Navn-pill (lys, med + ikon) */}
              <div className={`${styles.pill} ${styles.pillName}`}>
                <input
                  className={styles.pillNameField}
                  placeholder={
                    "Ingrediens" + (ingredients.length > 1 ? ` ${i + 1}` : "")
                  }
                  value={it.name ?? ""}
                  onChange={(e) => update(i, { name: e.target.value })}
                />
              </div>

              {/* Skraldespand */}
              <button
                type="button"
                className={styles.trashBtn}
                aria-label="Slet ingrediens"
                onClick={() => remove(i)}
                title="Slet"
              >
                <img src={trashIcon} alt="" />
              </button>
            </li>
          ))}
        </ul>

        {/* Stor plus i midten */}
        <div className={styles.bigPlusWrap}>
          <button
            type="button"
            className={styles.bigPlusBtn}
            onClick={addEmpty}
          >
            <img src={closeIcon} alt="Tilbage" className="bubbleIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
