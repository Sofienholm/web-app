import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import styles from "./BottomNav.module.css";

// 🔹 Ikoner
import homeIcon from "../../../public/assets/icon/ic-home-symbol-nav.svg";
import plusIcon from "../../../public/assets/icon/illu-add-symbol-beige.svg";
import catIcon from "../../../public/assets/icon/ic-category-symbol-nav.svg";
import linkIcon from "../../../public/assets/icon/ic-link-add.svg";
import imageIcon from "../../../public/assets/icon/ic-pic-add.svg";
import manualIcon from "../../../public/assets/icon/ic-manuelt-add.svg";

export default function BottomNav() {
  // 🔹 State: holder styr på om "plus-menuen" er åben
  const [open, setOpen] = useState(false);

  // 🔹 Bruges til at navigere mellem sider
  const navigate = useNavigate();

  // 🔹 Luk menuen med ESC eller klik udenfor
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    const onDown = (e) => {
      if (!open) return;
      const root = document.querySelector(`.${styles.nav}`);
      // hvis man klikker udenfor navbaren → luk
      if (root && !root.contains(e.target)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);

    // fjern event listeners, når komponent unmountes
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    // 🔹 Selve navbaren
    <nav
      className={`${styles.nav} ${open ? styles.open : ""}`}
      aria-label="Bundnavigation"
    >
      {/* 🔹 Venstre ikon: Home */}
      <NavLink to="/" className={styles.item} aria-label="Home">
        <img src={homeIcon} alt="" className={styles.icon} />
      </NavLink>

      {/* 🔹 Højre ikon: Kategorier */}
      <NavLink to="/categories" className={styles.item} aria-label="Kategorier">
        <img src={catIcon} alt="" className={styles.icon} />
      </NavLink>

      {/* 🔹 Midter-ikonet: Plus / Luk (Floating Action Button) */}
      <button
        className={styles.fab}
        aria-expanded={open}
        aria-label={open ? "Luk" : "Åbn tilføj-menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Plus-ikon (vises som standard) */}
        <img src={plusIcon} alt="" className={styles.fabIcon} />

        {/* X-ikon (vises kun når åben) */}
        <span className={styles.x} aria-hidden>
          <img src={plusIcon} alt="" className={styles.fabIcon} />
        </span>
      </button>

      {/* 🔹 Pop-up menu (“speed dial”) – tre valg der dukker op over plusknappen */}
      <div className={styles.dial} aria-hidden={!open}>
        {/* 1️⃣ Tilføj via link */}
        <button
          className={styles.dialBtn}
          style={{ "--x": "0px", "--y": "-110px" }}
          aria-label="Importer opskrift via link"
          onClick={() => {
            setOpen(false);
            navigate("/create/link"); // <-- RIGTIG sti til ImportFromUrlPage
          }}
        >
          <img src={linkIcon} alt="Importer opskrift" />
        </button>

        {/* 2️⃣ Tilføj via billede */}
        <button
          className={styles.dialBtn}
          style={{ "--x": "-82px", "--y": "-70px" }}
          onClick={() => setOpen(false)}
        >
          <img src={imageIcon} alt="" />
        </button>

        {/* 3️⃣ Tilføj manuelt */}
        <button
          className={styles.dialBtn}
          style={{ "--x": "82px", "--y": "-70px" }}
          onClick={() => {
            setOpen(false);
            navigate("/create"); // gå til opret-side
          }}
        >
          <img src={manualIcon} alt="" />
        </button>
      </div>
    </nav>
  );
}
