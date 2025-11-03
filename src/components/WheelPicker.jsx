// -- IMPORTS --
import { useState, useRef, useEffect } from "react";
import styles from "./WheelPicker.module.css";

// -- COMPONENT: WheelPicker --
export default function WheelPicker({
  label = "",
  valuesLeft = [],
  valuesRight = null,
  onConfirm,
  onClose,
  open,
}) {
  // -- REFS --
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // -- STATE --
  const [leftVal, setLeftVal] = useState(valuesLeft[0]); // valgt venstre værdi
  const [rightVal, setRightVal] = useState(valuesRight ? valuesRight[0] : null); // valgt højre værdi
  const ITEM_HEIGHT = 48; // højde pr. listeelement

  // -- EFFECT: lås scroll bagved (desktop + mobil) --
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  // -- EFFECT: når åbnet → scroll til valgt værdi --
  useEffect(() => {
    if (!open) return;
    scrollToSelected(leftRef, valuesLeft, leftVal); // centrer venstre valgt
    if (valuesRight) scrollToSelected(rightRef, valuesRight, rightVal); // centrer højre valgt
  }, [open]);

  // -- UTIL: scroll containeren så valgt værdi er i center --
  function scrollToSelected(ref, values, val) {
    if (!ref.current) return;
    const idx = values.indexOf(val);
    ref.current.scrollTo({
      top: idx * ITEM_HEIGHT, // fjern +2
      behavior: "auto",
    });
  }

  // -- HANDLER: opdater valgt værdi baseret på scrollposition --
  function handleScroll(ref, values, setVal, currentVal) {
    if (!ref.current) return;
    // vi starter faktisk 2 "items" nede pga. padding
    const index = Math.round(ref.current.scrollTop / ITEM_HEIGHT);

    const newVal = values[index];
    if (newVal !== undefined && newVal !== currentVal) {
      setVal(newVal);
    }
  }

  // -- HANDLER: bekræft valg --
  function handleConfirm() {
    if (valuesRight) onConfirm(leftVal, rightVal);
    else onConfirm(leftVal);
    onClose(); // luk efter bekræft
  }

  // -- RENDER HELPERS: tilføj tomme elementer før/efter så yderste værdier kan centreres --
  function renderWheel(values) {
    return (
      <>
        <div style={{ height: ITEM_HEIGHT * 2 }} />
        {values.map((v) => (
          <div key={v} className={styles.wheelItem}>
            {v}
          </div>
        ))}
        <div style={{ height: ITEM_HEIGHT * 2 }} />
      </>
    );
  }

  // -- EARLY RETURN: kun render når open --
  if (!open) return null;

  // -- RENDER --
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{label}</h3>

        <div className={styles.wheels}>
          {/* -- VENSTRE HJUL -- */}
          <div className={styles.venstredel}>
            <div
              className={styles.wheel}
              ref={leftRef}
              onScroll={() =>
                handleScroll(leftRef, valuesLeft, setLeftVal, leftVal)
              }
            >
              {renderWheel(valuesLeft)}
            </div>
            {valuesRight && <p>T</p>}
          </div>

          {/* -- HØJRE HJUL (valgfrit) -- */}
          {valuesRight ? (
            <div className={styles.hojredel}>
              <div
                className={styles.wheel}
                ref={rightRef}
                onScroll={() =>
                  handleScroll(rightRef, valuesRight, setRightVal, rightVal)
                }
              >
                {renderWheel(valuesRight)}
              </div>
              <p>M</p>
            </div>
          ) : (
            <div className={styles.hojredel}>
              <p>portioner</p>
            </div>
          )}

          {/* -- MIDTERMARKERING -- */}
          <div className={styles.selectionBox} />
        </div>

        {/* -- CTA -- */}
        <button className={styles.confirmBtn} onClick={handleConfirm}>
          OK
        </button>
      </div>
    </div>
  );
}
