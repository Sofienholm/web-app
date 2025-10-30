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
  // om plus-menuen er åben
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // luk med ESC og klik udenfor
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    const onDown = (e) => {
      if (!open) return;
      const root = document.querySelector(`.${styles.nav}`);
      // klik udenfor nav → luk
      if (root && !root.contains(e.target)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <>
      {/* 🔸 SLØR-BAGGRUND når plus er åben */}
      <div
        className={`${styles.overlay} ${open ? styles.showOverlay : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* 🔹 Selve navbaren */}
      <nav
        className={`${styles.nav} ${open ? styles.open : ""}`}
        aria-label="Bundnavigation"
      >
        {/* Venstre ikon: Home */}
        <NavLink to="/" className={styles.item} aria-label="Home">
          <img src={homeIcon} alt="" className={styles.icon} />
        </NavLink>

        {/* Højre ikon: Kategorier */}
        <NavLink
          to="/categories"
          className={styles.item}
          aria-label="Kategorier"
        >
          <img src={catIcon} alt="" className={styles.icon} />
        </NavLink>

        {/* Midter-ikonet: Plus / Luk */}
        <button
          className={styles.fab}
          aria-expanded={open}
          aria-label={open ? "Luk" : "Åbn tilføj-menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Plus-ikon (default) */}
          <img src={plusIcon} alt="" className={styles.fabIcon} />

          {/* “x” – vi genbruger plus men roterer */}
          <span className={styles.x} aria-hidden>
            <img src={plusIcon} alt="" className={styles.fabIcon} />
          </span>
        </button>

        {/* Pop-up / speed dial */}
        <div className={styles.dial} aria-hidden={!open}>
          {/* 1. Tilføj via link */}
          <button
            className={styles.dialBtn}
            style={{ "--x": "0px", "--y": "-110px" }}
            aria-label="Importer opskrift via link"
            onClick={() => {
              setOpen(false);
              navigate("/create/link");
            }}
          >
            <img src={linkIcon} alt="Importer opskrift" />
          </button>

          {/* 2. Tilføj via billede */}
          <button
            className={styles.dialBtn}
            style={{ "--x": "-82px", "--y": "-70px" }}
            onClick={() => setOpen(false)}
          >
            <img src={imageIcon} alt="" />
          </button>

          {/* 3. Tilføj manuelt */}
          <button
            className={styles.dialBtn}
            style={{ "--x": "82px", "--y": "-70px" }}
            onClick={() => {
              setOpen(false);
              navigate("/create");
            }}
          >
            <img src={manualIcon} alt="" />
          </button>
        </div>
      </nav>
    </>
  );
}
