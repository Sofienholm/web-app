import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

import styles from "./RecipeDonePage.module.css";

import backIcon from "/assets/icon/ic-back-symbol.svg";
import camPlaceholder from "/assets/illustrations/illu-camera-green.svg";
import trashIcon from "/assets/icon/ic-delete-symbol.svg";
import pencilIcon from "/assets/icon/ic-edit-symbol.svg";
import dinnerIllu from "/assets/illustrations/illu-tablefeast.svg";

export default function RecipeDonePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // vi gemmer den til senere brug

  // midlertidig lokal state indtil vi binder til storage/services
  const [photoUrl, setPhotoUrl] = useState(null);
  const [tips, setTips] = useState(["Top af med ristede pinjekerner"]);
  const [note, setNote] = useState(
    "Skriv dine personlige forbedringer på opskriften til næste gang her!"
  );

  // Vælg / tag nyt billede af retten
  function handleAddPhoto() {
    // TODO: åbne kamera / filvælger og sætte setPhotoUrl
    alert("Tilføj billede - kommer senere 📸");
  }

  // Slet et tip
  function handleDeleteTip(idx) {
    setTips((prev) => prev.filter((_, i) => i !== idx));
  }

  // Redigér note
  function handleEditNote() {
    // TODO: lave UI hvor man kan skrive ny note og så setNote(...)
    alert("Rediger note - kommer senere ✍️");
  }

  // Afslut → tilbage til forsiden (eller evt. tilbage til opskriften)
  function handleFinish() {
    navigate("/");
  }

  return (
    <main className={styles.screen}>
      {/* ---------- TOP LYSGUL BLOK ---------- */}
      <header className={styles.topBar}>
        {/* tilbage-knap venstre */}
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        {/* kamera / nyt billede */}
        <section className={styles.photoSection} onClick={handleAddPhoto}>
          <div className={styles.cameraCard}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Dit billede af retten"
                className={styles.cameraPreview}
              />
            ) : (
              <img
                src={camPlaceholder}
                alt="Tilføj billede"
                className={styles.cameraIllustration}
              />
            )}
          </div>

          <p className={styles.photoCta}>TA ET NYT BILLEDE AF RETTEN</p>
        </section>
      </header>

      {/* ---------- BEIGE INDHOLD ---------- */}
      <section className={styles.bodySection}>
        {/* TIPS & TRICKS */}
        <h2 className={styles.tipsHeader}>TILFØJ TIPS &amp; TRICKS</h2>

        {tips.map((tip, i) => (
          <div className={styles.tipRow} key={i}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => handleDeleteTip(i)}
              aria-label="Slet tip"
            >
              <img src={trashIcon} alt="" className={styles.iconImg} />
            </button>

            <div className={styles.tipBubble}>{tip}</div>
          </div>
        ))}

        {/* NOTE BOKS */}
        <div className={styles.noteBox}>
          <p className={styles.noteText}>{note}</p>

          <button
            type="button"
            className={styles.editBtn}
            onClick={handleEditNote}
            aria-label="Rediger note"
          >
            <img src={pencilIcon} alt="" className={styles.iconImg} />
          </button>
        </div>

        {/* ILLUSTRATION + “VELBEKOMMEN…” */}
        <div className={styles.dinnerWrap}>
          <img
            src={dinnerIllu}
            alt="Folk rundt om bordet"
            className={styles.dinnerIllustration}
          />
        </div>

        <p className={styles.wellDone}>
          VELBEKOMMEN &amp; GODT KLARET!
        </p>

        {/* AFSLUT KNAP */}
        <div className={styles.footerCtaWrap}>
          <button
            type="button"
            className={styles.finishBtn}
            onClick={handleFinish}
          >
            AFSLUT
          </button>
        </div>
      </section>
    </main>
  );
}
