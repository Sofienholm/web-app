import { useState } from "react";
import styles from "./IngredientsStep.module.css";
import Add from "/assets/icon/ic-add-symbol.svg";

export default function StepsSection({
  open,
  onOpen,
  onClose,
  steps,
  setSteps,
}) {
  const [draft, setDraft] = useState("");

  function addStep() {
    if (!draft.trim()) return;
    setSteps([...steps, { text: draft.trim() }]);
    setDraft("");
  }
  function removeStep(i) {
    setSteps(steps.filter((_, idx) => idx !== i));
  }

  if (!open) {
    return (
      <section className={styles.steps}>
        <div className={styles.stepsHead}>
          <h3>Fremgangsmåde</h3>
          <button type="button" className={styles.iconBtn} onClick={onOpen}>
            <img src={Add}  alt="" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.steps}>
      <div className={styles.stepsHead}>
        <h3>Fremgangsmåde</h3>
        <button type="button" className={styles.iconBtn} onClick={onClose}>
          ✕
        </button>
      </div>

      <ul className={styles.stepList}>
        {steps.map((s, i) => (
          <li key={i} className={styles.stepRow}>
            <span className={styles.stepText}>
              {i + 1}. {s.text}
            </span>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => removeStep(i)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.addRow}>
        <input
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Skriv et trin..."
        />
        <button type="button" className={styles.primary} onClick={addStep}>
          Tilføj
        </button>
      </div>
    </section>
  );
}
