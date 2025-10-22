import { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router";

import homeIcon from "../../assets/icon/ic-home-symbol-nav.svg";
import plusIcon from "../../assets/icon/ic-add-symbol.svg";
import catIcon from "../../assets/icon/ic-category-symbol-nav.svg";

// vælg de tre action-ikoner du har liggende
import linkIcon from "../../assets/icon/ic-back-symbol.svg"; // byt til jeres "link"
import imageIcon from "../../assets/icon/ic-camera-green.svg"; // "billede"
import manualIcon from "../../assets/icon/ic-edit-symbol.svg"; // "manuelt"

export default function BottomNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // luk på esc + klik udenfor
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDown = (e) => {
      if (!open) return;
      const root = document.querySelector(".pill-nav");
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
    <nav
      className={`pill-nav ${open ? "is-open" : ""}`}
      aria-label="Bundnavigation"
    >
      {/* venstre: Home */}
      <NavLink to="/" className="pill-nav__item" aria-label="Home">
        <img
          src={homeIcon}
          alt=""
          className="pill-nav__icon"
          width="44"
          height="44"
        />
      </NavLink>

      {/* højre: Kategorier */}
      <NavLink
        to="/categories"
        className="pill-nav__item"
        aria-label="Kategorier"
      >
        <img
          src={catIcon}
          alt=""
          className="pill-nav__icon"
          width="44"
          height="44"
        />
      </NavLink>

      {/* midter-PLUS / CLOSE */}
      <button
        className="pill-nav__fab"
        aria-expanded={open}
        aria-label={open ? "Luk" : "Åbn tilføj-menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {/* plus-ikon skjules når åben */}
        <img
          src={plusIcon}
          alt=""
          className="pill-nav__fab-icon"
          width="72"
          height="72"
        />
        {/* x som CSS-tegn, kun når åben */}
        <span className="pill-nav__x" aria-hidden>
          ×
        </span>
      </button>

      {/* speed-dial (popper op i en bue) */}
      <div className="dial" aria-hidden={!open}>
        <button
          className="dial-btn"
          style={{ "--x": "0px", "--y": "-110px" }}
          aria-label="Gem via link"
          onClick={() => {
            setOpen(false);
            navigate("/create"); // <--- ændr til din ønskede route
          }}
        >
          <img src={linkIcon} alt="" width="28" height="28" />
        </button>

        <button
          className="dial-btn"
          style={{ "--x": "-82px", "--y": "-70px" }}
          aria-label="Gem via billede"
          onClick={() => {
            setOpen(false); /* navigate('/create/image') */
          }}
        >
          <img src={imageIcon} alt="" width="28" height="28" />
        </button>

        <button
          className="dial-btn"
          style={{ "--x": "82px", "--y": "-70px" }}
          aria-label="Tilføj manuelt"
          onClick={() => {
            setOpen(false); /* navigate('/create/manual') */
          }}
        >
          <img src={manualIcon} alt="" width="28" height="28" />
        </button>
      </div>
    </nav>
  );
}
