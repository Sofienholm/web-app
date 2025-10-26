import { useState } from "react";
import styles from "./IngredientsStep.module.css";

export default function StepsSection({
  open,
  onOpen,
  onClose,
  steps,
  setSteps,
}) {
  // lokalt kladde-array så vi kan redigere i åben tilstand
  const [draftSteps, setDraftSteps] = useState(steps.length ? steps : [""]);

  // når vi åbner første gang, sørg for at have mindst én tom række
  function handleOpen() {
    if (!steps.length) setDraftSteps([""]);
    onOpen();
  }

  function changeStep(i, value) {
    const next = [...draftSteps];
    next[i] = value;
    setDraftSteps(next);
  }

  function addEmptyStep() {
    setDraftSteps([...draftSteps, ""]);
  }

  function removeStep(i) {
    setDraftSteps(draftSteps.filter((_, idx) => idx !== i));
  }

  function confirm() {
    // trim tomme rækker væk
    const clean = draftSteps.map((s) => s.trim()).filter(Boolean);
    setSteps(clean);
    onClose();
  }

  // — Lukket tilstand (stor plus-pill) —
  if (!open) {
    return (
      <section className={styles.card}>
        <h3 className={styles.title}>FREMGANGSMÅDE</h3>
        <button type="button" className={styles.addPill} onClick={handleOpen}>
          <span>+</span>
        </button>
      </section>
    );
  }

  // — Åben tilstand (lys panel, trin-liste, plus-pill, check) —
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>FREMGANGSMÅDE</h3>

      <div className={styles.panel}>
        <ul className={styles.list}>
          {draftSteps.map((text, i) => (
            <li key={i} className={styles.row}>
              <span className={styles.index}>{i + 1}</span>

              <div className={styles.inputPill}>
                <input
                  className={styles.inputField}
                  placeholder="Tilføj instruks"
                  value={text}
                  onChange={(e) => changeStep(i, e.target.value)}
                />
              </div>

              {/* slet-knap kun hvis mere end 1 række */}
              {draftSteps.length > 1 && (
                <button
                  type="button"
                  className={styles.delBtn}
                  aria-label="Slet trin"
                  onClick={() => removeStep(i)}
                >
                  🗑
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* plus-pill til at tilføje ny række */}
        <button
          type="button"
          className={styles.plusSmall}
          onClick={addEmptyStep}
        >
          +
        </button>
      </div>

      {/* stor check nederst */}
      <div className={styles.confirmWrap}>
        <button
          type="button"
          className={styles.confirmBtn}
          onClick={confirm}
          title="Færdig"
        >
          ✓
        </button>
      </div>
    </section>
  );
}
