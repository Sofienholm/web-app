import { useEffect, useRef, useState } from "react";
import styles from "./Step.module.css";
import Add from "/assets/icon/ic-add-symbol.svg";
import OK from "/assets/icon/ic-ok-symbol.svg";
import trashIcon from "/assets/icon/ic-delete-symbol.svg";
import editIcon from "/assets/icon/ic-edit-symbol.svg";

/**
 * Fremgangsmåde-sektion (trin) der "udvider" sig opad som samme kasse.
 * - Lukket: viser stor pill med + eller edit-ikon (hvis der findes trin)
 * - Åben: samme kasse bliver fixed i bunden og vokser opad; intern scroll
 * - Body-scroll låses, så kun panelet scroller
 */
export default function StepsSection({
  open,      // om kassen er åben (styres af parent)
  onOpen,    // åbn-funktion (fra parent)
  onClose,   // luk-funktion (fra parent)
  steps,     // gemte trin som strings
  setSteps,  // setter til gemte trin i parent (RecipeForm)
}) {
  const shellRef = useRef(null);           // reference til selve kasse-elementet
  const [shellH, setShellH] = useState(0); // højde i lukket tilstand (til spacer)
  const [draftSteps, setDraftSteps] = useState(
    steps.length ? steps : [""]
  ); // udkast-liste, som man redigerer i mens kassen er åben

  const hasSteps = steps && steps.length > 0; // bruges til at vælge + eller edit-ikon

  // Mål den lukkede kasses højde én gang → bruges som "spacer" i layout,
  // når kassen skifter til fixed (så resten af siden ikke hopper)
  useEffect(() => {
    if (shellRef.current) {
      setShellH(shellRef.current.getBoundingClientRect().height);
    }
  }, []);

  // Hver gang vi åbner, synkroniser udkastet med gemte trin
  useEffect(() => {
    if (open) setDraftSteps(steps.length ? steps : [""]);
  }, [open, steps]);

  // Lås body-scroll når kassen er åben (så kun panelet scroller)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // ——— handlers ———

  // Opdater tekst i et bestemt trin
  function changeStep(index, value) {
    const next = [...draftSteps];
    next[index] = value;
    setDraftSteps(next);
  }

  // Tilføj tomt trin nederst
  function addEmptyStep() {
    setDraftSteps([...draftSteps, ""]);
  }

  // Fjern et trin (lad mindst én tom række blive, så UX er tydelig)
  function removeStep(index) {
    const next = draftSteps.filter((_, i) => i !== index);
    setDraftSteps(next.length ? next : [""]);
  }

  // Bekræft/rediger færdig: trim tomme, gem i parent, luk
  function confirm() {
    const clean = draftSteps
      .map((s) => (typeof s === "string" ? s : s?.text || ""))
      .map((s) => s.trim())
      .filter(Boolean); // fjern tomme linjer
    setSteps(clean);    // gem i RecipeForm
    onClose();          // skift tilbage til lukket
  }

  return (
    <>
      {/* Spacer: bevarer højde i layout, så siden ikke hopper når .card bliver fixed */}
      <div style={{ height: shellH }} />

      {/* Samme kasse i begge tilstande (lukket/åben) */}
      <section
        ref={shellRef}
        className={`${styles.card} ${open ? styles.floating : ""}`}
        aria-live="polite"
      >
        {/* Titel (samme i begge tilstande) */}
        <h3 className={styles.title}>FREMGANGSMÅDE</h3>

        {/* LUKKET: stor pill med ikon (add hvis ingen trin, ellers edit) */}
        {!open && (
          <button
            type="button"
            className={styles.addPill}
            onClick={onOpen}
            aria-label={
              hasSteps ? "Redigér fremgangsmåde" : "Tilføj fremgangsmåde"
            }
          >
            <img
              src={hasSteps ? editIcon : Add}
              alt=""
              className={hasSteps ? styles.editIcon : styles.addIcon}
            />
          </button>
        )}

        {/* ÅBEN: indhold i samme kasse — intern scroll, body er låst */}
        {open && (
          <div className={styles.panelInplace}>
            {/* Liste over alle trin */}
            <ul className={styles.list}>
              {draftSteps.map((text, i) => (
                <li key={i} className={styles.row}>
                  {/* Trin-nummer */}
                  <span className={styles.index}>{i + 1}</span>

                  {/* Input-pill for trin-tekst */}
                  <div className={styles.inputPill}>
                    <input
                      className={styles.inputField}
                      placeholder="Tilføj instruks"
                      value={text}
                      onChange={(e) => changeStep(i, e.target.value)}
                    />
                  </div>

                  {/* Slet-knap (skjul hvis kun én række, så UX er enklere) */}
                  {draftSteps.length > 1 && (
                    <button
                      type="button"
                      className={styles.trashBtn}
                      onClick={() => removeStep(i)}
                      aria-label={`Slet trin ${i + 1}`}
                    >
                      <img src={trashIcon} alt="" />
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Tilføj endnu et trin (lille plus-pill) */}
            <button
              type="button"
              className={styles.plusSmall}
              onClick={addEmptyStep}
              aria-label="Tilføj trin"
            >
              <img src={Add} alt="" className={styles.plusSmallIcon} />
            </button>

            {/* Færdig (gem og luk) */}
            <div className={styles.confirmWrap}>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={confirm}
                aria-label="Færdig"
              >
                <img src={OK} alt="" className={styles.okIcon} />
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}