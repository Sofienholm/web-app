import styles from "../ProfilePage.module.css";

/**
 * items: Array<{ label: string, onClick: () => void, className?: "settingsBtn"|"notificationsBtn"|"helpBtn" }>
 */
export default function ActionList({ items = [] }) {
  return (
    <nav className={styles.actions} aria-label="Profil handlinger">
      {items.map((it, idx) => (
        <button
          key={idx}
          type="button"
          className={`${styles.actionBtn} ${it.className ? styles[it.className] : ""}`}
          onClick={it.onClick}
        >
          <span className={styles.actionLabel}>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
