// src/pages/auth/SignupAvatarPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../app/firebase";
import styles from "./SignupAvatarPage.module.css";
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
  const auth = getAuth();
  const user = auth.currentUser;

  // fallback hvis der ikke findes bruger (fx anonym)
  const fallbackIndex = AVATARS.indexOf(
    "/assets/illustrations/ill-profil-avatar-man-garlic.svg"
  );

  const [currentIndex, setCurrentIndex] = useState(fallbackIndex);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const current = AVATARS[currentIndex];
  const isSelected = selectedIndex === currentIndex;

  function handleNext() {
    setCurrentIndex((i) => (i + 1) % AVATARS.length);
  }

  function handlePrev() {
    setCurrentIndex((i) => (i - 1 + AVATARS.length) % AVATARS.length);
  }

  async function handleSelect() {
    if (!user) return;
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          avatarUrl: current,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      setSelectedIndex(currentIndex);
    } catch (err) {
      console.error("Fejl ved gemning af avatar:", err);
    }
  }

  async function handleFinish() {
    if (!user) return;
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          avatarUrl: current,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Fejl ved afslutning:", err);
      alert("Kunne ikke gemme avatar. Prøv igen.");
    }
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
