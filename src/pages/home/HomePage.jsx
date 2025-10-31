import { useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.css";
import useLocalAuth from "../../hooks/useLocalAuth.js";

// Svævende mad-illustrationer (uden kagen)
import noodles from "../../../public/assets/home/ill-home-food-nudles-pink.svg";
import cake from "../../../public/assets/home/ill-home-food-cake-pink.svg";
import pasta from "../../../public/assets/home/ill-home-food-pasta-pink.svg";
import meat from "../../../public/assets/home/ill-home-food-meat-pink.svg";
import veggie from "../../../public/assets/home/ill-home-food-veggie-pink.svg";

// Lyserødt bundkort (manden på bøger etc.)
import bottomCardBg from "../../../public/assets/illustrations/illu-homekort.svg";

export default function HomePage() {
  // ⬇️ vigtig ændring: få user ud af hook-objektet
  const { user } = useLocalAuth();

  const firstName =
    user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "ven";

  // måle-span (usynlig) og styling-states
  const measureRef = useRef(null);
  const [nameFontSize, setNameFontSize] = useState(64);
  const [nameLineHeight, setNameLineHeight] = useState(0.9);

  useEffect(() => {
    const measurer = measureRef.current;
    if (!measurer || !firstName) return;

    // målbare konstanter
    const TARGET_WIDTH = 260; // px: den visuelle kolonne vi vil matche
    const MIN_SIZE = 24; // mindste font-size vi accepterer
    const MAX_SIZE = 110; // største font-size vi accepterer
    const STEP = 1; // hvor fint vi tuner

    // helper der måler given size
    const widthAt = (sizePx) => {
      measurer.style.fontSize = sizePx + "px";
      measurer.textContent = firstName;
      return measurer.offsetWidth;
    };

    // 1) baseline
    let testSize = 64;
    let currentWidth = widthAt(testSize);

    // 2) skalér op hvis for smalt
    if (currentWidth < TARGET_WIDTH) {
      while (testSize < MAX_SIZE) {
        const next = testSize + STEP;
        const nextWidth = widthAt(next);
        if (nextWidth > TARGET_WIDTH) break;
        testSize = next;
        currentWidth = nextWidth;
      }
    }

    // 3) skalér ned hvis for bredt
    if (currentWidth > TARGET_WIDTH) {
      while (testSize > MIN_SIZE) {
        const next = testSize - STEP;
        const nextWidth = widthAt(next);
        if (nextWidth <= TARGET_WIDTH) {
          testSize = next;
          currentWidth = nextWidth;
          break;
        }
        testSize = next;
        currentWidth = nextWidth;
      }
    }

    setNameFontSize(testSize);

    // line-height mapping
    const span = MAX_SIZE - MIN_SIZE;
    const pct = span === 0 ? 0 : (testSize - MIN_SIZE) / span;
    const lhMax = 1.25;
    const lhMin = 0.7;
    const computedLH = lhMax - pct * (lhMax - lhMin);

    setNameLineHeight(parseFloat(computedLH.toFixed(2)));
  }, [firstName]);

  return (
    <section className={styles.home}>
      {/* skjult måle-node */}
      <span
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-poppins)",
          fontWeight: 1000,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
        }}
      />

      {/* HERO TEKST */}
      <div className={styles.hero}>
        <div className={styles.heroTextBox}>
          <div
            className={styles.welcomeLine}
            style={{ maxWidth: "260px", fontSize: "2.5rem" }}
          >
            VELKOMMEN
          </div>

          <div
            className={styles.nameLine}
            style={{
              maxWidth: "260px",
              fontSize: nameFontSize + "px",
              lineHeight: nameLineHeight,
            }}
          >
            {firstName}
          </div>

          <div className={styles.subLine} style={{ maxWidth: "260px" }}>
            HVAD ER DER PÅ MENUEN?
          </div>
        </div>
      </div>

      {/* SVÆVENDE MAD-ILLUSTRATIONER */}
      <div className={styles.illustrations}>
        <img
          src={noodles}
          alt="Nudler"
          className={`${styles.foodImg} ${styles.noodles}`}
        />
        <img
          src={cake}
          alt="cake"
          className={`${styles.foodImg} ${styles.cake}`}
        />
        <img
          src={pasta}
          alt="Pasta"
          className={`${styles.foodImg} ${styles.pasta}`}
        />
        <img
          src={meat}
          alt="Kød"
          className={`${styles.foodImg} ${styles.meat}`}
        />
        <img
          src={veggie}
          alt="Grøntsager"
          className={`${styles.foodImg} ${styles.veggie}`}
        />
      </div>

      {/* LYSE RØDE BAGGRUNDSKORT NEDERST */}
      <div className={styles.bottomCardMask}>
        <img src={bottomCardBg} alt="" className={styles.bottomCardImg} />
      </div>
    </section>
  );
}
