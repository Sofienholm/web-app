import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SignupAvatarPage.module.css";
import { setAvatar } from "../../services/auth.local.js";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

const AVATARS = [
  "/assets/illustrations/ill-profil-avatar-woman-eating.svg",
  "/assets/illustrations/ill-profil-avatar-chef.svg",
  "/assets/illustrations/ill-profil-avatar-mom-cooking.svg",
  "/assets/illustrations/ill-profil-avatar-woman-pokadots.svg",
  "/assets/illustrations/ill-profil-avatar-man-garlic.svg",
  "/assets/illustrations/ill-profil-avatar-man-burger.svg",
];

export default function SignupAvatarPage() {
  const navigate = useNavigate();

  let stored = null;
  try {
    const raw = localStorage.getItem("profile");
    stored = raw ? JSON.parse(raw)?.avatarSrc ?? null : null;
  } catch {
    stored = null;
  }

  const fallbackIndex = AVATARS.indexOf(
    "/assets/illustrations/ill-profil-avatar-man-garlic.svg"
  );
  const startIndex = stored
    ? AVATARS.indexOf(stored) !== -1
      ? AVATARS.indexOf(stored)
      : fallbackIndex
    : fallbackIndex;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [selectedIndex, setSelectedIndex] = useState(
    stored ? AVATARS.indexOf(stored) : -1
  );

  const current = AVATARS[currentIndex];
  const isSelected = selectedIndex === currentIndex;

  function handleNext() {
    setCurrentIndex((i) => (i + 1) % AVATARS.length);
  }
  function handlePrev() {
    setCurrentIndex((i) => (i - 1 + AVATARS.length) % AVATARS.length);
  }
  function handleSelect() {
    setAvatar(current);
    setSelectedIndex(currentIndex);
  }
  function handleFinish() {
setAvatar(current, { activateSession: true, finishOnboarding: true });
    navigate("/home", { replace: true });
  }

  return (
    <main className={styles.screen}>
      <div className={styles.shell}>
        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        <header className={styles.headBlock}>
          <h1 className={styles.appTitle}>MIN KOGEBOG</h1>
          <p className={styles.sub}>
            Vælg en profil-karakter der passer <br />
            <strong>DIN</strong> personlighed
          </p>
        </header>

        {/* ... resten uændret (carousel, knapper) ... */}
        {/* vigtigst er at Afslut -> handleFinish() */}
        <div className={styles.afslutRow}>
          <button
            type="button"
            onClick={handleFinish}
            className={styles.afslutBtn}
          >
            Afslut
          </button>
        </div>
      </div>
    </main>
  );
}
