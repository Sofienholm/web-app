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
  const { id } = useParams();

  const [tips, setTips] = useState(["Top af med ristede pinjekerner"]);
  const [note, setNote] = useState(
    "Skriv dine personlige forbedringer på opskriften til næste gang her!"
  );

  function handleAddPhoto() {
    alert("Tilføj billede - kommer senere 📸");
  }

  function handleDeleteTip(idx) {
    setTips((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleEditNote() {
    alert("Rediger note - kommer senere ✍️");
  }

  function handleFinish() {
    navigate("/home");
  }

  return (
    <main className={styles.screen}>
      {/* ---------- TOP LYSGUL BLOK ---------- */}
      <header className={styles.topBar}>
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        <section className={styles.photoSection} onClick={handleAddPhoto}>
          <div className={styles.cameraCard}>
            <img
              src={camPlaceholder}
              alt="Tilføj billede"
              className={styles.cameraIllustration}
            />
          </div>
          <p className={styles.photoCta}>TA ET NYT BILLEDE AF RETTEN</p>
        </section>
      </header>

      {/* ---------- BEIGE INDHOLD ---------- */}
      <section className={styles.bodySection}>
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

        <div className={styles.dinnerWrap}>
          <img
            src={dinnerIllu}
            alt="Folk rundt om bordet"
            className={styles.dinnerIllustration}
          />
        </div>

        <p className={styles.wellDone}>VELBEKOMMEN &amp; GODT KLARET!</p>

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
