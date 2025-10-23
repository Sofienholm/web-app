import React from "react";
import { useNavigate } from "react-router";
import styles from "./ProfilePage.module.css";

// components
import ProfileInfo from "./components/ProfileInfo";
import ActionList from "./components/ActionList";
import LogoutButton from "./components/LogoutButton";

// illustration
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";
import editIcon from "../../../public/assets/icon/ic-edit-symbol.svg";
import profileIllustration from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

export default function ProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: "Testbruger",
    email: "test@eksempel.dk",
  };

  return (
    <div className={styles.page}>

      {/* 🔸 Topknapper */}
      <div className={styles.topButtons}>
        <button
          type="button"
          className={`${styles.profileButton} ${styles.leftButton}`}
          aria-label="Gå til forside"
          onClick={() => navigate("/")}
        >
          <img src={backIcon} alt="Tilbage" className={styles.profileIcon} />
        </button>

        <button
          type="button"
          className={`${styles.profileButton} ${styles.rightButton}`}
          aria-label="Rediger profil"
          onClick={() => navigate("/profile/edit")}
        >
          <img src={editIcon} alt="Rediger" className={styles.profileIcon} />
        </button>
      </div>


      {/* Top: profilbillede + info */}
      <ProfileInfo
        name={user.name}
        email={user.email}
        illustrationSrc={profileIllustration}
      />

      {/* Action-knapper */}
      <ActionList
  items={[
    { label: "Indstillinger", onClick: () => navigate("/settings"), className: "settingsBtn" },
    { label: "Notifikationer", onClick: () => navigate("/notifications"), className: "notificationsBtn" },
    { label: "Hjælp", onClick: () => navigate("/help"), className: "helpBtn" },
  ]}
/>

      {/* Log af-knap i bunden */}
      <LogoutButton />
    </div>
  );
}
