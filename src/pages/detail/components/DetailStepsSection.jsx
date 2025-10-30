// DetailStepsSection.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import styles from "../../create/components/Step.module.css";
import closeIcon from "/assets/icon/ic-add-symbol.svg"; // byt evt. til "chevron-down"

/**
 * Parallax-agtig "scroll-to-reveal" sektion.
 * Brugeren forsøger at scrolle på siden, men i stedet bevæger step-sektionen sig op.
 * Når man slipper fingeren, snapper den op eller ned alt efter hvor langt man "scroll-ede".
 */

export default function DetailStepsSection({ steps }) {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // === NYT: “peek”-konstant (20% synligt) ===
  const PEEK = 80;
  const [offset, setOffset] = useState(PEEK);
  const [scrolling, setScrolling] = useState(false);
  const startY = useRef(0);
  const startOffset = useRef(PEEK);
  const panelRef = useRef(null);
  const isTouchInPanel = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e) => {
      // start-koordinat
      startY.current = e.touches[0].clientY;
      startOffset.current = offset;
      setScrolling(true);

      // tjek om vi startede scroll på panelInplace
      const path = e.composedPath?.() || [];
      isTouchInPanel.current = path.some((el) => el === panelRef.current);
    };

    const handleTouchMove = (e) => {
      if (!scrolling) return;

      const y = e.touches[0].clientY;
      const deltaY = startY.current - y; // + = swipe op

      // Hvis vi er helt åbne og finger er i panelet, så lad panelet scrolle
      if (offset === 0 && isTouchInPanel.current && panelRef.current) {
        const el = panelRef.current;
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

        const draggingDown = deltaY < 0; // finger ned
        const draggingUp = deltaY > 0; // finger op

        // Kun overtag drag, hvis man forsøger at "trække forbi" panelets kanter
        const shouldDragSheet =
          (atTop && draggingDown) || (atBottom && draggingUp);

        if (!shouldDragSheet) {
          // tillad native scroll i panelet
          return;
        }
        // ellers: vi lader sheetet tage over -> prevent default + drag
      }

      // Normal sheet-drag (clamp mod 0..PEEK)
      const next = Math.max(
        0,
        Math.min(PEEK, startOffset.current - deltaY / 4)
      );
      setOffset(next);
      e.preventDefault(); // stop sidescroll
    };

    const handleTouchEnd = () => {
      setScrolling(false);
      isTouchInPanel.current = false;

      // Snap kun hvis vi faktisk havde gang i sheet-drag (offset != 0 eller != PEEK)
      setOffset((prev) => (prev < PEEK / 2 ? 0 : PEEK));
    };

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
    // === NYT: luk = “peek” i stedet for helt væk
    setOffset(PEEK);
  }

  function handleDone() {
    navigate(`/recipe/${id}/done`);
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

        {/* samme layout som CreatePage → panelInplace + list + row */}
        <div ref={panelRef} className={styles.panelInplace}>
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
          <button type="button" className={styles.doneBtn} onClick={handleDone}>
            Færdig
          </button>
        </div>
      </div>
    </section>
  );
}
