// src/components/recipe/ChipGroup.jsx
import styles from "./ChipGroup.module.css";

const ALL_TAGS = [
  "Budget",
  "Hurtigt & nemt",
  "Vegetar",
  "Asiatisk",
  "Favorit",
  "Mors køkken",
  "Pasta",
  "Mexicansk",
];

export default function ChipGroup({ selected, setSelected }) {
  function toggleTag(tag) {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  }

  return (
    <section className={styles.tagsSection}>
      <h3>Tilføj tags</h3>
      <div className={styles.chipGroup}>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`${styles.chip} ${
              selected.includes(tag) ? styles.active : ""
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
