import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SignupAvatarPage.module.css";
import { setAvatar } from "../../services/auth.local.js";

import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

// dine avatarer
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

  const stored = localStorage.getItem("profile.avatarSrc");
  const [current, setCurrent] = useState(
    stored || "/assets/illustrations/ill-profil-avatar-man-garlic.svg"
  );

  function handleFinish() {
    setAvatar(current);
    navigate("/"); // færdig -> hjem
  }

  return (
    <main className={styles.page}>
      {/* Tilbage-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButton}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      <h1 className={styles.title}>Vælg din figur</h1>
      <p className={styles.sub}>Den vises som din avatar i appen</p>

      {/* Preview kort */}
      <div className={styles.previewCard}>
        <img src={current} alt="Valgt avatar" className={styles.previewImg} />
      </div>

      {/* Grid med valg */}
      <div className={styles.avatarGrid}>
        {AVATARS.map((src) => (
          <button
            key={src}
            type="button"
            className={`${styles.avatarBtn} ${
              current === src ? styles.avatarBtnActive : ""
            }`}
            onClick={() => setCurrent(src)}
          >
            <img src={src} alt="" className={styles.avatarThumbImg} />
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className={styles.submitRow}>
        <button
          type="button"
          onClick={handleFinish}
          className={styles.submitBtn}
        >
          Færdig
        </button>
      </div>
    </main>
  );
}
