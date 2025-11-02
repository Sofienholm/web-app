import { getAuth, signOut } from "firebase/auth";
import styles from "../ProfilePage.module.css";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("Bruger logget af");
      // Du kan evt. redirecte her, fx navigate("/login")
    } catch (error) {
      console.error("Fejl ved log ud:", error);
    }
  };

  return (
    <button
      type="button"
      className={styles.logoutBtn}
      onClick={handleLogout}
    >
      LOG AF
    </button>
  );
}
