import { getAuth, signOut } from "firebase/auth";
import styles from "../ProfilePage.module.css";

/**
 * Simpel komponent til at logge brugeren ud.
 *
 * - Bruger Firebase Authentication’s `signOut` metode.
 * - Logger evt. fejl til konsollen, hvis logout fejler.
 * - Du kan nemt udvide funktionen med fx navigation efter logout.
 */
export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // logger brugeren ud fra Firebase
      console.log("Bruger logget af");
      // Eksempel: navigate("/login") kan tilføjes her, hvis ønsket
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
