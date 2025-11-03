// -- IMPORTS --
import { useEffect, useRef, useState } from "react";
import styles from "./Step.module.css";
import Add from "/assets/icon/ic-add-symbol.svg";
import OK from "/assets/icon/ic-ok-symbol.svg";
import trashIcon from "/assets/icon/ic-delete-symbol.svg";
import editIcon from "/assets/icon/ic-edit-symbol.svg";

// -- STEPS SECTION COMPONENT --
// Fremgangsmåde-sektion der åbner som et redigerbart panel i bunden.
// Lukket: viser en stor "pill" med + eller redigeringsikon.
// Åben: samme kasse bliver fixed i bunden og vokser opad med intern scroll.
export default function StepsSection({
  open, // om kassen er åben (styres af parent)
  onOpen, // åbn-funktion (fra parent)
  onClose, // luk-funktion (fra parent)
  steps, // gemte trin som strings
  setSteps, // setter til gemte trin i parent (RecipeForm)
}) {
  // -- REFS OG STATE --
  const shellRef = useRef(null); // reference til selve kasse-elementet
  const [shellH, setShellH] = useState(0); // højde i lukket tilstand (spacer)
  const [draftSteps, setDraftSteps] = useState(steps.length ? steps : [""]); // udkast, som redigeres i mens kassen er åben

  const hasSteps = steps && steps.length > 0; // bruges til at vælge ikon (add/edit)

  // -- USEEFFECT: MÅL HØJDE --
  // Mål kassen i lukket tilstand for at bevare plads i layoutet, når den bliver fixed
  useEffect(() => {
    if (shellRef.current) {
      setShellH(shellRef.current.getBoundingClientRect().height);
    }
  }, []);

  // -- USEEFFECT: SYNC DRAFT --
  // Synkroniser redigeringsudkastet med de gemte trin, når panelet åbnes
  useEffect(() => {
    if (open) setDraftSteps(steps.length ? steps : [""]);
  }, [open, steps]);

  // -- USEEFFECT: LOCK BODY SCROLL --
  // Lås baggrundsscroll når panelet er åbent
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // -- HANDLERS --

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

  // Fjern et trin (mindst én række bevares)
  function removeStep(index) {
    const next = draftSteps.filter((_, i) => i !== index);
    setDraftSteps(next.length ? next : [""]);
  }

  // Bekræft og gem – fjerner tomme linjer og sender tilbage til parent
  function confirm() {
    const clean = draftSteps
      .map((s) => (typeof s === "string" ? s : s?.text || ""))
      .map((s) => s.trim())
      .filter(Boolean);
    setSteps(clean);
    onClose();
  }

  // -- RENDER OUTPUT --
  return (
    <>
      {/* Spacer: bevarer højde i layout, så siden ikke hopper når .card bliver fixed */}
      <div style={{ height: shellH }} />

      {/* Kassen der bruges både i lukket og åben tilstand */}
      <section
        ref={shellRef}
        className={`${styles.card} ${open ? styles.floating : ""}`}
        aria-live="polite"
      >
        {/* Titel */}
        <h3 className={styles.title}>FREMGANGSMÅDE</h3>

        {/* -- LUKKET TILSTAND -- */}
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

        {/* -- ÅBEN TILSTAND -- */}
        {open && (
          <div className={styles.panelInplace}>
            {/* Liste over alle trin */}
            <ul className={styles.list}>
              {draftSteps.map((text, i) => (
                <li key={i} className={styles.row}>
                  {/* Trin-nummer */}
                  <span className={styles.index}>{i + 1}</span>

                  {/* Input-felt for trin-tekst */}
                  <div className={styles.inputPill}>
                    <input
                      className={styles.inputField}
                      placeholder="Tilføj instruks"
                      value={text}
                      onChange={(e) => changeStep(i, e.target.value)}
                    />
                  </div>

                  {/* Slet-knap (vises kun hvis flere trin) */}
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

            {/* Tilføj nyt trin */}
            <button
              type="button"
              className={styles.plusSmall}
              onClick={addEmptyStep}
              aria-label="Tilføj trin"
            >
              <img src={Add} alt="" className={styles.plusSmallIcon} />
            </button>

            {/* Færdig-knap */}
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
