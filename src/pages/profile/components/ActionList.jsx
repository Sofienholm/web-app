import styles from "../ProfilePage.module.css";

/**
 * Viser en liste af knapper med forskellige handlinger på profilsiden.
 * 
 * Props:
 * - items: array af { label, onClick, className? }
 *   - label: teksten på knappen
 *   - onClick: funktion, der kaldes ved klik
 *   - className: valgfri ekstra klasse (fx "helpBtn")
 */
export default function ActionList({ items = [] }) {
  return (
    <nav className={styles.actions} aria-label="Profil handlinger">
      {items.map((it, idx) => (
        <button
          key={idx}
          type="button"
          // tilføj evt. ekstra klasse hvis specificeret
          className={`${styles.actionBtn} ${
            it.className ? styles[it.className] : ""
          }`}
          onClick={it.onClick}
        >
          {/* tekst på knappen */}
          <span className={styles.actionLabel}>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
