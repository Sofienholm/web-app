import styles from "./BasicsFields.module.css";


export default function BasicsFields({
  title,
  setTitle,
  description,
  setDescription,
  timeMin,
  setTimeMin,
  servings,
  setServings,
  image,
  setImage,
}) {
  return (
    <section className={styles.basics}>
      {/* Billede-upload (placeholder) */}
      <div className={styles.imageBox}>
        <button
          type="button"
          onClick={() => alert("Upload billede (kommer senere)")}
        >
          +
        </button>
      </div>

      {/* Titel */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titel"
        className={styles.titleInput}
      />

      {/* Beskrivelse */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Kort beskrivelse af retten"
        className={styles.descInput}
      />

      {/* Tid og portioner */}
      <div className={styles.timeServings}>
        <div>
          <label>Tid</label>
          <input
            type="number"
            value={timeMin}
            onChange={(e) => setTimeMin(e.target.value)}
          />
        </div>
        <div>
          <label>Portioner</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
