// src/pages/profile/ProfileEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider.jsx";
import {
  onProfileSnapshot,
  upsertUserProfile,
} from "../../services/profile.js";
import styles from "./ProfileEdit.module.css";

import profileIllustration from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

const AVATARS = [
  "public/assets/illustrations/ill-profil-avatar-woman-eating.svg",
  "public/assets/illustrations/ill-profil-avatar-chef.svg",
  "public/assets/illustrations/ill-profil-avatar-mom-cooking.svg",
  "public/assets/illustrations/ill-profil-avatar-woman-pokadots.svg",
  "public/assets/illustrations/ill-profil-avatar-man-burger.svg",
  "public/assets/illustrations/ill-profil-avatar-man-garlic.svg",
];

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);

  // hent aktuel avatar
  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onProfileSnapshot(user.uid, (p) =>
      setSelected(p?.avatarUrl || null)
    );
    return unsub;
  }, [user?.uid]);

  async function handlePick(src) {
    setSelected(src);
    if (user?.uid) await upsertUserProfile(user.uid, { avatarUrl: src });
  }

  return (
    <div className={styles.page}>
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

      <div className={styles.illustrationCard}>
        <img
          src={selected || profileIllustration}
          alt="Profilillustration"
          className={styles.illustrationImg}
        />
      </div>

      <div className={styles.avatarGrid}>
        {AVATARS.map((src, i) => {
          const active = selected === src;
          return (
            <button
              key={src}
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
