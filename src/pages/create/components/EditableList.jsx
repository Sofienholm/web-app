// src/components/recipe/EditableList.jsx

import styles from "./EditableList.module.css";

export default function EditableList({ items, setItems, mode, onClose }) {
  function addItem() {
    const newItem =
      mode === "steps" ? { text: "" } : { unit: "", amount: "", name: "" };
    setItems([...items, newItem]);
  }

 

  return (
    <div className={styles.editableList}>
      <div className={styles.listHeader}>
        <h3>{mode === "steps" ? "Fremgangsmåde" : "Ingredienser"}</h3>
        {onClose && (
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        )}
      </div>

   

      <button type="button" onClick={addItem} className={styles.addBtn}>
        +
      </button>
    </div>
  );
}
