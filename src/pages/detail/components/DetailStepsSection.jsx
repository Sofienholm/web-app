import styles from "../../create/components/Step.module.css";
import closeIcon from "/assets/icon/ic-add-symbol.svg"; // byt gerne til et "chevron-down" ikon
import { useEffect, useRef, useState } from "react";


/**
 * Parallax-agtig "scroll-to-reveal" sektion.
 * Brugeren forsøger at scrolle på siden, men i stedet bevæger step-sektionen sig op.
 * Når man slipper fingeren, snapper den op eller ned alt efter hvor langt man "scroll-ede".
 */
export default function DetailStepsSection({ steps }) {
  const sectionRef = useRef(null);

  // 100% = helt nede, 0% = helt oppe
  const [offset, setOffset] = useState(100);
  const [scrolling, setScrolling] = useState(false);
  const startY = useRef(0);
  const startOffset = useRef(100);

  useEffect(() => {
    const handleTouchStart = (e) => {
      setScrolling(true);
      startY.current = e.touches[0].clientY;
      startOffset.current = offset;
    };

    const handleTouchMove = (e) => {
      if (!scrolling) return;
      const deltaY = startY.current - e.touches[0].clientY; // positiv = swipe op
      const newOffset = Math.max(
        0,
        Math.min(100, startOffset.current - deltaY / 4)
      );
      setOffset(newOffset);
      e.preventDefault(); // stop browser-scroll
    };

    const handleTouchEnd = () => {
      setScrolling(false);
      // snap op/ned
      setOffset((prev) => (prev < 50 ? 0 : 100));
    };

    // bind events på body så bevægelsen føles som "scroll"
    document.body.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.body.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.body.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.body.removeEventListener("touchstart", handleTouchStart);
      document.body.removeEventListener("touchmove", handleTouchMove);
      document.body.removeEventListener("touchend", handleTouchEnd);
    };
  }, [offset, scrolling]);

  function handleClose() {
    setOffset(100);
  }

  return (
    <section
      ref={sectionRef}
      className={styles.detailStepsSection}
      style={{
        transform: `translateY(${offset}%)`,
        transition: scrolling
          ? "none"
          : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className={styles.inner}>
        <div className={styles.stepsHeaderRow}>
          <h2>FREMGANGSMÅDE</h2>
          <button
            type="button"
            className={styles.closeStepsBtn}
            onClick={handleClose}
            aria-label="Luk"
          >
            <img src={closeIcon} alt="Luk" className="bubbleIcon" />
          </button>
        </div>
        {/* Samme layout som CreatePage → panelInplace + list + row */}
        <div className={styles.panelInplace}>
          <ul className={styles.list}>
            {Array.isArray(steps) && steps.length > 0 ? (
              steps.map((text, i) => (
                <li key={i} className={styles.row}>
                  {/* Trin-nummer */}
                  <span className={styles.index}>{i + 1}</span>

                  {/* Input-pill erstattet med read-only tekst */}
                  <div className={styles.inputPill}>
                    <div className={styles.inputFieldReadOnly}>
                      {text || "Ingen tekst"}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className={styles.rowEmpty}>Ingen trin tilføjet</li>
            )}
          </ul>
        </div>
        <div className={styles.done}>
          <button
          type="button"
          className={styles.doneBtn}
      
       >
            Færdig
          </button>

        </div>
       
      </div>
    </section>
  );
}
