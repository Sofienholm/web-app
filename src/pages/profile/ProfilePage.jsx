// -- IMPORTS --
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { onProfileSnapshot } from "../../services/profile.js";
import { useAuth } from "../../providers/AuthProvider.jsx";
import styles from "./ProfilePage.module.css";

// -- COMPONENTS --
import ProfileInfo from "./components/ProfileInfo";
import ActionList from "./components/ActionList";

// -- ASSETS --
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";
import editIcon from "../../../public/assets/icon/ic-edit-symbol.svg";
import profileDefault from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onProfileSnapshot(user.uid, (data) => setProfile(data));
    return unsub;
  }, [user?.uid]);

  const avatarSrc = profile?.avatarUrl || profileDefault;
  const name = profile?.displayName || user?.displayName || "Bruger";
  const email = user?.email || "ukendt@mail.dk";

  async function handleLogout() {
    const auth = getAuth();
    await signOut(auth);
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.page}>
      {/* -- TOPKNAPPER -- */}
      <div className={styles.topButtons}>
        <button
          type="button"
          className="bubbleButton bubbleRed bubbleLeft"
          onClick={() => navigate("/home")}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>

        <button
          type="button"
          className="bubbleButton bubbleRed bubbleRight"
          onClick={() => navigate("/profile/edit")}
          aria-label="Rediger profil"
        >
          <img src={editIcon} alt="Rediger" className="bubbleIcon" />
        </button>
      </div>

      {/* -- PROFILINFO -- */}
      <ProfileInfo name={name} email={email} illustrationSrc={avatarSrc} />

      {/* -- HANDLINGSKNAPPER -- */}
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

      {/* -- LOG UD KNAP -- */}
      <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
        Log af
      </button>
    </div>
  );
}
