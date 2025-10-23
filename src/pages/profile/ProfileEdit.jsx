import React from "react";
import { useNavigate } from "react-router";
import styles from "./ProfileEdit.module.css";

// illustrationer
import profileIllustration from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function ProfileEdit() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* 🔸 Tilbage-knap */}
      <div className={styles.topButtons}>
        <button
          type="button"
          className={`${styles.profileButton} ${styles.leftButton}`}
          aria-label="Tilbage til profil"
          onClick={() => navigate("/profile")}
        >
          <img src={backIcon} alt="Tilbage" className={styles.profileIcon} />
        </button>
      </div>

      {/* 🔸 Profilkort – med justeret placering */}
      <div className={styles.illustrationCard}>
        <img
          src={profileIllustration}
          alt="Profilillustration"
          className={styles.illustrationImg}
        />
      </div>
    </div>
  );
}
