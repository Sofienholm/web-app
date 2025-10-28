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
  "/assets/illustrations/ill-profil-avatar-man-burger.svg",
  "/assets/illustrations/ill-profil-avatar-man-garlic.svg",
];

export default function SignupAvatarPage() {
  const navigate = useNavigate();

  // hent tidligere gemt avatar hvis der er en
  const stored = localStorage.getItem("profile.avatarSrc");

  const fallbackIndex = AVATARS.indexOf(
    "/assets/illustrations/ill-profil-avatar-man-garlic.svg"
  );

  const startIndex = stored
    ? AVATARS.indexOf(stored) !== -1
      ? AVATARS.indexOf(stored)
      : fallbackIndex
    : fallbackIndex;

  // hvilket kort er i fokus lige nu (det store preview)
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // hvilken avatar er markeret som “valgt”
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

  // når man trykker "Vælg"
  function handleSelect() {
    setAvatar(current);
    setSelectedIndex(currentIndex);
  }

  // når man trykker "Afslut" / "Opret"
  function handleFinish() {
    setAvatar(current);
    navigate("/");
  }

  return (
    <main className={styles.screen}>
      <div className={styles.shell}>
        {/* Tilbage-knap */}
        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        {/* Titel og intro */}
        <header className={styles.headBlock}>
          <h1 className={styles.appTitle}>MIN KOGEBOG</h1>
          <p className={styles.sub}>
            Vælg en profil-karakter der passer <br />
            <strong>DIN</strong> personlighed
          </p>
        </header>

        {/* Avatar vælger sektion */}
        <section className={styles.carousel}>
          {/* TOP: lille horisontal række med alle avatars */}
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
                    <img
                      src={src}
                      alt=""
                      className={styles.thumbImg}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* MIDTEN: stort preview af den valgte */}
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

          {/* UNDER: pil ←  Vælg  → */}
          <div className={styles.chooseRow}>
            {/* venstre pil */}
            <button
              type="button"
              onClick={handlePrev}
              className={`bubbleButton bubbleRed ${styles.roundBubble}`}
              aria-label="Forrige avatar"
            >
              <img src={backIcon} alt="" className="bubbleIcon" />
            </button>

            {/* vælg-knap */}
            <button
              type="button"
              onClick={handleSelect}
              className={`${styles.chooseBtn} ${
                isSelected ? styles.chooseBtnActive : ""
              }`}
            >
              Vælg
            </button>

            {/* højre pil, samme ikon men vendt */}
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

          {/* Afslut-knap lige efter vælg */}
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

        {/* Nederste CTA "Opret" */}
        <div className={styles.btnRow}>
          <button
            type="button"
            onClick={handleFinish}
            className={styles.ctaBtn}
          >
            Opret
          </button>
        </div>
      </div>
    </main>
  );
}
