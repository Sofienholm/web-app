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

  useEffect(() => {
    if (open) {
      scrollToSelected(leftRef, valuesLeft, leftVal);
      if (valuesRight) scrollToSelected(rightRef, valuesRight, rightVal);
    }
  }, [open]);

  function scrollToSelected(ref, values, val) {
    if (!ref.current) return;
    const idx = values.indexOf(val);
    ref.current.scrollTo({
      top: idx * ITEM_HEIGHT - 2 * ITEM_HEIGHT, // centrerer midt
      behavior: "auto",
    });
  }

  function handleScroll(ref, values, setVal, val) {
    const scrollTop = ref.current.scrollTop + ITEM_HEIGHT * 2; // midt offset
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const newVal = values[index];
    if (newVal !== val) setVal(newVal);
  }

  function handleConfirm() {
    if (valuesRight) onConfirm(leftVal, rightVal);
    else onConfirm(leftVal);
    onClose();
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{label}</h3>

        <div className={styles.wheels}>
          <div className={styles.venstredel}>
            <div
              className={styles.wheel}
              ref={leftRef}
              onScroll={() =>
                handleScroll(leftRef, valuesLeft, setLeftVal, leftVal)
              }
            >
              {valuesLeft.map((v) => (
                <div key={v} className={styles.wheelItem}>
                  {v}
                </div>
              ))}
            </div>

            {/* vis “T” kun hvis der er en højre del */}
            {valuesRight && <p>T</p>}
          </div>

          {valuesRight ? (
            <div className={styles.hojredel}>
              <div
                className={styles.wheel}
                ref={rightRef}
                onScroll={() =>
                  handleScroll(rightRef, valuesRight, setRightVal, rightVal)
                }
              >
                {valuesRight.map((v) => (
                  <div key={v} className={styles.wheelItem}>
                    {v}
                  </div>
                ))}
              </div>
              <p>M</p>
            </div>
          ) : (
            // hvis der ikke er højre del → vis label "portioner"
            <div className={styles.hojredel}>
              <p>portioner</p>
            </div>
          )}

          <div className={styles.selectionBox}></div>
        </div>

        <button className={styles.confirmBtn} onClick={handleConfirm}>
          OK
        </button>
      </div>
    </div>
  );
}
