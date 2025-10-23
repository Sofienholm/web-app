import styles from "./Sheet.module.css";

export default function Sheet({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()} // forhindrer klik på baggrund
      >
        {children}
      </div>
    </div>
  );
}
