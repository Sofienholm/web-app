// -- IMPORTS --
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider.jsx";
import {
  onProfileSnapshot,
  upsertUserProfile,
} from "../../services/profile.js";
import styles from "./ProfileEdit.module.css";

// -- ASSETS (illustrationer og ikoner) --
import profileIllustration from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";
import a1 from "../../../public/assets/illustrations/ill-profil-avatar-woman-eating.svg";
import a2 from "../../../public/assets/illustrations/ill-profil-avatar-chef.svg";
import a3 from "../../../public/assets/illustrations/ill-profil-avatar-mom-cooking.svg";
import a4 from "../../../public/assets/illustrations/ill-profil-avatar-woman-pokadots.svg";
import a5 from "../../../public/assets/illustrations/ill-profil-avatar-man-burger.svg";
import a6 from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

// Liste over mulige avatar-billeder
const AVATARS = [a1, a2, a3, a4, a5, a6];

// -- COMPONENT: ProfileEdit --
export default function ProfileEdit() {
  const navigate = useNavigate();
  const { user } = useAuth(); // henter den aktuelle bruger fra context
  const [selected, setSelected] = useState(null); // gemmer nuværende valgt avatar

  // -- EFFECT: hent nuværende profilbillede fra Firestore --
  useEffect(() => {
    if (!user?.uid) return; // stop hvis ingen bruger
    const unsub = onProfileSnapshot(user.uid, (p) =>
      setSelected(p?.avatarUrl || null)
    );
    return unsub; // rydder op ved unmount
  }, [user?.uid]);

  // -- HANDLER: opdater valg og gem i Firestore --
  async function handlePick(src) {
    setSelected(src); // vis straks valgt billede
    if (user?.uid) await upsertUserProfile(user.uid, { avatarUrl: src }); // gem i databasen
  }

  // -- RENDER --
  return (
    <div className={styles.page}>
      {/* -- TILBAGE KNAP -- */}
      <div className={styles.topButtons}>
        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleLeft ${
            styles.backButtonFixed ?? ""
          }`}
          aria-label="Tilbage til profil"
          onClick={() => navigate("/profile")} // går tilbage til profilsiden
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>
      </div>

      {/* -- VISUELT PROFILKORT MED NUVARRENDE VALG -- */}
      <div className={styles.illustrationCard}>
        <img
          src={selected || profileIllustration}
          alt="Profilillustration"
          className={styles.illustrationImg}
        />
      </div>

      {/* -- GRID MED MULIGE AVATARER -- */}
      <div className={styles.avatarGrid}>
        {AVATARS.map((src, i) => {
          const active = selected === src; // marker valgt
          return (
            <button
              key={src}
              type="button"
              className={`${styles.avatarBtn} ${
                active ? styles.avatarBtnActive : ""
              }`}
              onClick={() => handlePick(src)} // vælg ny avatar
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
