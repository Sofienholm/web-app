import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SignupAvatarPage.module.css";

import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

// de samme avatar SVGs som resten af appen bruger
const AVATARS = [
  "/assets/illustrations/ill-profil-avatar-woman-eating.svg",
  "/assets/illustrations/ill-profil-avatar-chef.svg",
  "/assets/illustrations/ill-profil-avatar-mom-cooking.svg",
  "/assets/illustrations/ill-profil-avatar-woman-pokadots.svg",
  "/assets/illustrations/ill-profil-avatar-man-burger.svg",
  "/assets/illustrations/ill-profil-avatar-man-garlic.svg",
];

export default function SignupAvatarPage() {
  const navigate = useNavigate();

  // start fra første kort
  const [index, setIndex] = useState(0);

  // skift avatar venstre/højre
  function prevAvatar() {
    setIndex((i) => (i === 0 ? AVATARS.length - 1 : i - 1));
  }
  function nextAvatar() {
    setIndex((i) => (i === AVATARS.length - 1 ? 0 : i + 1));
  }

  // gem alt permanent + log ind
  function handleCreate() {
    const finalName = localStorage.getItem("signup.tmpName") || "";
    const finalEmail = localStorage.getItem("signup.tmpEmail") || "";
    const finalPw = localStorage.getItem("signup.tmpPw") || "";

    localStorage.setItem("profile.name", finalName);
    localStorage.setItem("profile.email", finalEmail);
    localStorage.setItem("profile.password", finalPw);
    localStorage.setItem("profile.avatarSrc", AVATARS[index]);

    localStorage.setItem("auth.loggedIn", "true");

    // ryd temp
    localStorage.removeItem("signup.tmpName");
    localStorage.removeItem("signup.tmpEmail");
    localStorage.removeItem("signup.tmpPw");

    navigate("/");
  }

  return (
    <div className={styles.screen}>
      {/* top header */}
      <header className={styles.top}>
        <button
          className={`bubbleButton bubbleRed bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        <div className={styles.headBlock}>
          <div className={styles.appTitle}>MIN KOGEBOG</div>
          <div className={styles.subline}>
            Vælg en profil karakter der{" "}
            <br />
            passer DIN personlighed
          </div>
        </div>
      </header>

      {/* avatar carousel area */}
      <main className={styles.mainArea}>
        <div className={styles.avatarRow}>
          {/* det store kort */}
          <div className={styles.avatarCard}>
            <img
              src={AVATARS[index]}
              alt="Valgt avatar"
              className={styles.avatarImg}
            />
          </div>

          {/* "bars" til højre (dummy step indicator look) */}
          <div className={styles.barsCol}>
            {AVATARS.map((_, i) => (
              <div
                key={i}
                className={`${styles.bar} ${
                  i === index ? styles.barActive : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* vælg controls */}
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={prevAvatar}
            aria-label="Forrige"
          >
            ←
          </button>

          <div className={styles.chooseBubble}>Vælg</div>

          <button
            type="button"
            className={styles.arrowBtn}
            onClick={nextAvatar}
            aria-label="Næste"
          >
            →
          </button>
        </div>

        {/* opret knap */}
        <div className={styles.btnRow}>
          <button
            type="button"
            className={styles.createBtn}
            onClick={handleCreate}
          >
            Opret
          </button>
        </div>
      </main>
    </div>
  );
}
