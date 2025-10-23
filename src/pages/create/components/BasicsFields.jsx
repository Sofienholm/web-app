// src/pages/Create/components/BasicsFields.jsx
import { useRef } from "react";
import styles from "./RecipeForm.module.css";
import cameraIcon from "/assets/icon/illu-camera-green.svg";

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
  const fileRef = useRef(null);

  function pickFile() {
    fileRef.current?.click();
  }

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result); // dataURL → preview + gemmes i parent
    reader.readAsDataURL(file);
  }

  return (
    <section className={styles.form}>
      {/* Billede-vælger */}
      <div className={styles.imageBox} onClick={pickFile} role="button">
        {image ? (
          <img
            className={styles.imagePreview}
            src={image}
            alt="Valgt billede"
          />
        ) : (
          <img
            className={styles.imagePlaceholder}
            src={cameraIcon}
            alt="Vælg billede"
          />
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className={styles.hiddenFile}
        onChange={onFileChange}
      />
      {image && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => setImage("")}
        >
          Fjern billede
        </button>
      )}

      {/* Titel */}
      <label>
        Titel
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Fx Pasta med tomatsauce"
        />
      </label>

      {/* Beskrivelse */}
      <label>
        Beskrivelse
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kort beskrivelse af retten…"
        />
      </label>

      {/* Tid & portioner */}
      <div className={styles.row}>
        <label>
          Tid (min)
          <input
            type="number"
            value={timeMin}
            onChange={(e) => setTimeMin(e.target.value)}
            placeholder="30"
          />
        </label>
        <label>
          Portioner
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            placeholder="4"
          />
        </label>
      </div>
    </section>
  );
}
