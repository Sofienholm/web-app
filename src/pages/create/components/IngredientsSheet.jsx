import styles from "./Ingredients.module.css";
import trashIcon from "/assets/icon/ic-delete-symbol.svg";
import closeIcon from "/assets/icon/ic-add-symbol.svg";
const UNITS = ["kg", "g", "ml"];

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
    setIngredients([...ingredients, { amount: "", unit: "g", name: "" }]);
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
              {/* Mængde-pill */}
              <input
                className={`${styles.pill} ${styles.pillAmount}`}
                type="number"
                inputMode="decimal"
                placeholder=""
                value={it.amount ?? ""}
                onChange={(e) => update(i, { amount: e.target.value })}
              />

              {/* Enhed-pill (select) */}
              <div className={`${styles.pill} ${styles.pillSelect}`}>
                <select
                  className={styles.pillSelectField}
                  value={it.unit ?? "g"}
                  onChange={(e) => update(i, { unit: e.target.value })}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                <span className={styles.pillCaret}>▾</span>
              </div>

              {/* Navn-pill (lys, med + ikon) */}
              <div className={`${styles.pill} ${styles.pillName}`}>
                <span className={styles.pillPlus}>+</span>
                <input
                  className={styles.pillNameField}
                  placeholder=""
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
            +
          </button>
        </div>
      </div>
    </div>
  );
}
