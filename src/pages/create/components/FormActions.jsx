import styles from "../CreatePage.module.css";
export default function FormActions() {
  return (
    <div className={styles.formActions}>
      <button type="submit" className={styles.saveBtn}>
        AFSLUT
      </button>
    </div>
  );
}
