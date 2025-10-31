import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./ProfileEdit.module.css";

// services
import { setAvatar } from "../../services/auth.local.js";

// illustrationer
import profileIllustration from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function ProfileEdit() {
  const navigate = useNavigate();

  // læs avatar fra samlet profile-objekt
  let stored = null;
  try {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem("profile") : null;
    stored = raw ? JSON.parse(raw)?.avatarSrc ?? null : null;
  } catch {
    stored = null;
  }

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

  function handlePick(src) {
    setSelected(src);
    setAvatar(src); // opdaterer profile + udsender "local-auth-changed"
  }

  return (
    <div className={styles.page}>
      {/* 🔸 Tilbage-knap */}
      <div className={styles.topButtons}>
        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleLeft ${
            styles.backButtonFixed ?? ""
          }`}
          aria-label="Tilbage til profil"
          onClick={() => navigate("/profile")}
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
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
