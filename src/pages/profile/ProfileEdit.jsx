import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./ProfileEdit.module.css";

// illustrationer
import profileIllustration from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function ProfileEdit() {
  const navigate = useNavigate();

  // læs tidligere valg (hvis nogen)
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("profile.avatarSrc")
      : null;

  const [selected, setSelected] = useState(stored);

  // BYT filnavne til dine rigtige filer i /public/assets/illustrations/avatars/
  const avatars = [
    "/assets/illustrations/ill-profil-avatar-woman-eating.svg",
    "/assets/illustrations/ill-profil-avatar-chef.svg",
    "/assets/illustrations/ill-profil-avatar-mom-cooking.svg",
    "/assets/illustrations/ill-profil-avatar-woman-pokadots.svg",
    "/assets/illustrations/ill-profil-avatar-man-burger.svg",
    "/assets/illustrations/ill-profil-avatar-man-garlic.svg",
  ];

  const handlePick = (src) => {
    setSelected(src);
    localStorage.setItem("profile.avatarSrc", src); // gør valget synligt på ProfilePage
  };

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

      {/* 🔸 Profilkort – viser valgt eller default */}
      <div className={styles.illustrationCard}>
        <img
          src={selected || stored || profileIllustration}
          alt="Profilillustration"
          className={styles.illustrationImg}
        />
      </div>

      {/* 🔸 6 valgmuligheder */}
      <div className={styles.avatarGrid}>
        {avatars.map((src, i) => {
          const active = (selected || stored) === src;
          return (
            <button
              key={i}
              type="button"
              className={`${styles.avatarBtn} ${
                active ? styles.avatarBtnActive : ""
              }`}
              onClick={() => handlePick(src)}
              aria-pressed={active}
              aria-label={`Vælg avatar ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className={styles.avatarImg}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
