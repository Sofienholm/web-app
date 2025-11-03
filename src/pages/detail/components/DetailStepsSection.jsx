// -- IMPORTS --
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../../create/components/Step.module.css";
import closeIcon from "/assets/icon/ic-add-symbol.svg"; // roteres i CSS

// -- DETAIL STEPS SECTION COMPONENT --
// Viser fremgangsmåde som en “scroll-to-reveal” sektion,
// der kan swipes op fra bunden for at læse trinene.
export default function DetailStepsSection({ steps }) {
  // -- REFS OG STATE --
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const PEEK = 80; // procentdel af sektionen, der “titter frem” i lukket tilstand
  const [offset, setOffset] = useState(PEEK); // hvor meget panelet er trukket op
  const [scrolling, setScrolling] = useState(false);
  const startY = useRef(0);
  const startOffset = useRef(PEEK);
  const panelRef = useRef(null);
  const isTouchInPanel = useRef(false);

  // -- TOUCH-EVENTS: ÅBN/LUK PANEL --
  // Håndterer “drag to reveal”-bevægelsen via touch på mobil
  useEffect(() => {
    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
      startOffset.current = offset;
      setScrolling(true);
      const path = e.composedPath?.() || [];
      isTouchInPanel.current = path.some((el) => el === panelRef.current);
    };

    const handleTouchMove = (e) => {
      if (!scrolling) return;
      const y = e.touches[0].clientY;
      const deltaY = startY.current - y; // positiv = swipe op

      // Undgå at scrolle panelindhold og sheet samtidig
      if (offset === 0 && isTouchInPanel.current && panelRef.current) {
        const el = panelRef.current;
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        const draggingDown = deltaY < 0;
        const draggingUp = deltaY > 0;
        const shouldDragSheet =
          (atTop && draggingDown) || (atBottom && draggingUp);
        if (!shouldDragSheet) return;
      }

      const next = Math.max(
        0,
        Math.min(PEEK, startOffset.current - deltaY / 4)
      );
      setOffset(next);
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      setScrolling(false);
      isTouchInPanel.current = false;
      // Snap: åben helt eller luk helt, alt efter hvor langt man har trukket
      setOffset((prev) => (prev < PEEK / 2 ? 0 : PEEK));
    };

    // Event listeners til mobilinteraktion
    document.body.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.body.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.body.addEventListener("touchend", handleTouchEnd);

    // Ryd op ved unmount
    return () => {
      document.body.removeEventListener("touchstart", handleTouchStart);
      document.body.removeEventListener("touchmove", handleTouchMove);
      document.body.removeEventListener("touchend", handleTouchEnd);
    };
  }, [offset, scrolling]);

  // -- HANDLERS --
  function handleClose() {
    setOffset(PEEK); // luk panelet
  }

  function handleDone() {
    navigate(`/recipe/${id}/done`); // navigér til “færdig”-siden
  }

  // -- RENDER OUTPUT --
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
        {/* -- HEADER -- */}
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

        {/* -- LISTE MED TRIN -- */}
        <div ref={panelRef} className={styles.panelInplace}>
          <ul className={styles.list}>
            {Array.isArray(steps) && steps.length > 0 ? (
              steps.map((text, i) => (
                <li key={i} className={styles.row}>
                  <span className={styles.index}>{i + 1}</span>
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

        {/* -- FÆRDIG KNAP -- */}
        <div className={styles.doneWrap}>
          <button type="button" className={styles.doneBtn} onClick={handleDone}>
            Færdig
          </button>
        </div>
      </div>
    </section>
  );
}
