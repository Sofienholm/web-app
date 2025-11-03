// -- IMPORTS --
import { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import styles from "./HomePage.module.css";

// -- ASSETS: Svævende mad-illustrationer (uden kagen) --
import noodles from "../../../public/assets/home/ill-home-food-nudles-pink.svg";
import cake from "../../../public/assets/home/ill-home-food-cake-pink.svg";
import pasta from "../../../public/assets/home/ill-home-food-pasta-pink.svg";
import meat from "../../../public/assets/home/ill-home-food-meat-pink.svg";
import veggie from "../../../public/assets/home/ill-home-food-veggie-pink.svg";

// -- ASSETS: Lyserødt bundkort (manden på bøger etc.) --
import bottomCardBg from "../../../public/assets/illustrations/illu-homekort.svg";

// -- COMPONENT: HomePage --
export default function HomePage() {
  const auth = getAuth();
  const user = auth.currentUser;

  // -- USERNAME: brugerens fornavn eller fallback --
  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "ven";

  // -- MÅLING TIL DYNAMISK FONT --
  const measureRef = useRef(null);
  const [nameFontSize, setNameFontSize] = useState(64);
  const [nameLineHeight, setNameLineHeight] = useState(0.9);

  // -- EFFECT: dynamisk font-tilpasning af navnet --
  useEffect(() => {
    const measurer = measureRef.current;
    if (!measurer || !firstName) return;

    const TARGET_WIDTH = 260;
    const MIN_SIZE = 24;
    const MAX_SIZE = 110;
    const STEP = 1;

    // mål bredde for givent font-size
    const widthAt = (sizePx) => {
      measurer.style.fontSize = sizePx + "px";
      measurer.textContent = firstName;
      return measurer.offsetWidth;
    };

    let testSize = 64;
    let currentWidth = widthAt(testSize);

    // skaler op hvis der er plads
    if (currentWidth < TARGET_WIDTH) {
      while (testSize < MAX_SIZE) {
        const next = testSize + STEP;
        const nextWidth = widthAt(next);
        if (nextWidth > TARGET_WIDTH) break;
        testSize = next;
        currentWidth = nextWidth;
      }
    }

    // skaler ned hvis for bred
    if (currentWidth > TARGET_WIDTH) {
      while (testSize > MIN_SIZE) {
        const next = testSize - STEP;
        const nextWidth = widthAt(next);
        if (nextWidth <= TARGET_WIDTH) break;
        testSize = next;
        currentWidth = nextWidth;
      }
    }

    setNameFontSize(testSize);

    // beregn line-height baseret på font-size
    const span = MAX_SIZE - MIN_SIZE;
    const pct = span === 0 ? 0 : (testSize - MIN_SIZE) / span;
    const lhMax = 1.25;
    const lhMin = 0.7;
    const computedLH = lhMax - pct * (lhMax - lhMin);

    setNameLineHeight(parseFloat(computedLH.toFixed(2)));
  }, [firstName]);

  // -- RENDER --
  return (
    <section className={styles.home}>
      {/* -- SKJULT MÅLE-NODE (til tekstbredden) -- */}
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

      {/* -- HERO TEKST -- */}
      <div className={styles.hero}>
        <div className={styles.heroTextBox}>
          <div
            className={styles.welcomeLine}
            style={{ maxWidth: "260px", fontSize: "2.5rem" }} // fast størrelse på "VELKOMMEN"
          >
            VELKOMMEN
          </div>

          <div
            className={styles.nameLine}
            style={{
              maxWidth: "260px",
              fontSize: nameFontSize + "px", // dynamisk størrelse
              lineHeight: nameLineHeight,     // dynamisk line-height
            }}
          >
            {firstName}
          </div>

          <div className={styles.subLine} style={{ maxWidth: "260px" }}>
            HVAD ER DER PÅ MENUEN?
          </div>
        </div>
      </div>

      {/* -- SVÆVENDE MAD-ILLUSTRATIONER -- */}
      <div className={styles.illustrations}>
        <img src={noodles} alt="Nudler" className={`${styles.foodImg} ${styles.noodles}`} />
        <img src={cake} alt="cake" className={`${styles.foodImg} ${styles.cake}`} />
        <img src={pasta} alt="Pasta" className={`${styles.foodImg} ${styles.pasta}`} />
        <img src={meat} alt="Kød" className={`${styles.foodImg} ${styles.meat}`} />
        <img src={veggie} alt="Grøntsager" className={`${styles.foodImg} ${styles.veggie}`} />
      </div>

      {/* -- LYSE RØDE BAGGRUNDSKORT NEDERST -- */}
      <div className={styles.bottomCardMask}>
        <img src={bottomCardBg} alt="" className={styles.bottomCardImg} />
      </div>
    </section>
  );
}
