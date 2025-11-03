import styles from "../ProfilePage.module.css";

/**
 * Viser brugerens profilinformation:
 * - Et profilbillede (illustration)
 * - Brugerens navn
 * - Brugerens e-mail
 *
 * Props:
 *  - name: string → vises som overskrift under billedet
 *  - email: string → vises som undertekst
 *  - illustrationSrc: string (URL) → stien til profilillustrationen
 */
export default function ProfileInfo({ name, email, illustrationSrc }) {
  return (
    <section className={styles.infoSection}>
      {/* Profilkort med billede */}
      <div className={styles.illustrationCard}>
        <img
          src={illustrationSrc}
          alt="Profil illustration"
          className={styles.illustrationImg}
        />
      </div>

      {/* Navn og e-mail under billedet */}
      <div className={styles.userText}>
        <h1 className={styles.userName}>{name}</h1>
        <p className={styles.userEmail}>{email}</p>
      </div>
    </section>
  );
}
