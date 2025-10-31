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

  const stored = localStorage.getItem("profile.avatarSrc");
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
    setAvatar(current);
    // ⬇️ færdig → direkte til Home
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

        <section className={styles.carousel}>
          <div className={styles.thumbStripWrapper}>
            <div className={styles.thumbStrip}>
              {AVATARS.map((src, i) => {
                const activeThumb = i === currentIndex;
                return (
                  <button
                    key={src}
                    type="button"
                    className={`${styles.thumbBtn} ${
                      activeThumb ? styles.thumbBtnActive : ""
                    }`}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Vælg avatar ${i + 1}`}
                  >
                    <img src={src} alt="" className={styles.thumbImg} />
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`${styles.previewCard} ${
              isSelected ? styles.previewCardActive : ""
            }`}
          >
            <img
              src={current}
              alt="Valgt avatar"
              className={styles.previewImg}
            />
          </div>

          <div className={styles.chooseRow}>
            <button
              type="button"
              onClick={handlePrev}
              className={`bubbleButton bubbleRed ${styles.roundBubble}`}
              aria-label="Forrige avatar"
            >
              <img src={backIcon} alt="" className="bubbleIcon" />
            </button>

            <button
              type="button"
              onClick={handleSelect}
              className={`${styles.chooseBtn} ${
                isSelected ? styles.chooseBtnActive : ""
              }`}
            >
              Vælg
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`bubbleButton bubbleRed ${styles.roundBubble}`}
              aria-label="Næste avatar"
            >
              <img
                src={backIcon}
                alt=""
                className={`bubbleIcon ${styles.iconFlip}`}
              />
            </button>
          </div>

          <div className={styles.afslutRow}>
            <button
              type="button"
              onClick={handleFinish}
              className={styles.afslutBtn}
            >
              Afslut
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
