// Read-only version af StepsSection: samme kasse, fold-ud, ingen inputs/slet.
import { useEffect, useRef, useState } from "react";
import styles from "../../create/components/Step.module.css";
import Add from "/assets/icon/ic-add-symbol.svg";

export default function DetailStepsSection({ steps }) {
  const shellRef = useRef(null);
  const [shellH, setShellH] = useState(0);
  const [open, setOpen] = useState(false);

  const hasSteps = Array.isArray(steps) && steps.length > 0;

  useEffect(() => {
    if (shellRef.current) {
      setShellH(shellRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    // Lås body-scroll når panelet er åbent (samme UX som edit)
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      {/* Spacer så siden ikke hopper når kassen bliver fixed */}
      <div style={{ height: shellH }} />

      <section
        ref={shellRef}
        className={`${styles.card} ${open ? styles.floating : ""}`}
        aria-live="polite"
      >
        <h3 className={styles.title}>FREMGANGSMÅDE</h3>

        {/* LUKKET: vis knap til at åbne trin-listen */}
        {!open && (
          <button
            type="button"
            className={styles.addPill}
            onClick={() => setOpen(true)}
            aria-label={
              hasSteps ? "Vis fremgangsmåde" : "Tilføj/vis fremgangsmåde"
            }
          >

          </button>
        )}

        {/* ÅBEN: liste over trin (kun læsning) */}
        {open && (
          <div className={styles.panelInplace}>
            <ul className={styles.list}>
              {(steps || []).map((text, i) => (
                <li key={i} className={styles.row}>
                  <span className={styles.index}>{i + 1}</span>
                  <div className={styles.inputPill}>
                    {/* Samme visuelle “pill” som input, men kun tekst */}
                    <div
                      className={styles.inputField}
                      style={{ pointerEvents: "none" }}
                    >
                      {text}
                    </div>
                  </div>
                  {/* Ingen slet-knap i detail */}
                </li>
              ))}
            </ul>

            {/* Lille “luk”-knap – vi genbruger add-pill style for at matche formsprog */}
            <div className={styles.confirmWrap}>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={() => setOpen(false)}
                aria-label="Luk"
              >
                {/* bruger samme ikon-stil som OK i edit-mode, men det er bare en luk */}
                <span className={styles.okIcon} aria-hidden="true">
                  ✕
                </span>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
