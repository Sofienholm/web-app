import { useState, useRef, useEffect } from "react";
import styles from "./WheelPicker.module.css";

export default function WheelPicker({
  label = "",
  valuesLeft = [],
  valuesRight = null,
  onConfirm,
  onClose,
  open,
}) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [leftVal, setLeftVal] = useState(valuesLeft[0]);
  const [rightVal, setRightVal] = useState(valuesRight ? valuesRight[0] : null);
  const ITEM_HEIGHT = 48;

  // 🔒 Lås scroll bagved (desktop + mobil)
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

  // Når åbnet → scroll til valgt værdi
  useEffect(() => {
    if (!open) return;
    scrollToSelected(leftRef, valuesLeft, leftVal);
    if (valuesRight) scrollToSelected(rightRef, valuesRight, rightVal);
  }, [open]);

function scrollToSelected(ref, values, val) {
  if (!ref.current) return;
  const idx = values.indexOf(val);
  ref.current.scrollTo({
    top: idx * ITEM_HEIGHT, // fjern +2
    behavior: "auto",
  });
}


  function handleScroll(ref, values, setVal, currentVal) {
    if (!ref.current) return;
    // vi starter faktisk 2 "items" nede pga. padding
const index = Math.round(ref.current.scrollTop / ITEM_HEIGHT);

    const newVal = values[index];
    if (newVal !== undefined && newVal !== currentVal) {
      setVal(newVal);
    }
  }

  function handleConfirm() {
    if (valuesRight) onConfirm(leftVal, rightVal);
    else onConfirm(leftVal);
    onClose();
  }

  // Tilføjer tomme elementer før/efter så yderste værdier kan centreres
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

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{label}</h3>

        <div className={styles.wheels}>
          {/* Venstre hjul */}
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

          {/* Højre hjul */}
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

          {/* Midtermarkering */}
          <div className={styles.selectionBox} />
        </div>

        <button className={styles.confirmBtn} onClick={handleConfirm}>
          OK
        </button>
      </div>
    </div>
  );
}
