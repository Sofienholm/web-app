import React from "react";
import { useNavigate } from "react-router";
import styles from "./ProfilePage.module.css";
import { logoutUser } from "../../services/auth.local.js";
import { useLocalAuth } from "../../hooks/useLocalAuth.js";

// components
import ProfileInfo from "./components/ProfileInfo";
import ActionList from "./components/ActionList";

// illustrationer
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";
import editIcon from "../../../public/assets/icon/ic-edit-symbol.svg";
import profileDefault from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

export default function ProfilePage() {
  const navigate = useNavigate();
  const auth = useLocalAuth();

  const avatarSrc =
    (typeof window !== "undefined" &&
      localStorage.getItem("profile.avatarSrc")) ||
    profileDefault;

  const name =
    auth?.name || "Testbruger";

  const email =
    auth?.email || "test@eksempel.dk";

  function handleLogout() {
    logoutUser();
    navigate("/welcome");
  }

  return (
    <div className={styles.page}>
      {/* 🔸 Topknapper */}
      <div className={styles.topButtons}>
        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleLeft`}
          onClick={() => navigate("/")}
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>

        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleRight`}
          onClick={() => navigate("/profile/edit")}
        >
          <img src={editIcon} alt="Rediger" className="bubbleIcon" />
        </button>
      </div>

      {/* 🔸 Profilbillede og info */}
      <ProfileInfo
        name={name}
        email={email}
        illustrationSrc={avatarSrc}
      />

      {/* 🔸 Action-knapper */}
      <ActionList
        items={[
          {
            label: "Indstillinger",
            onClick: () => navigate("/settings"),
            className: "settingsBtn",
          },
          {
            label: "Notifikationer",
            onClick: () => navigate("/notifications"),
            className: "notificationsBtn",
          },
          {
            label: "Hjælp",
            onClick: () => navigate("/help"),
            className: "helpBtn",
          },
        ]}
      />

      {/* 🔸 Log af-knap */}
      <button
        type="button"
        className={styles.logoutBtn}
        onClick={handleLogout}
      >
        Log af
      </button>
    </div>
  );
}
