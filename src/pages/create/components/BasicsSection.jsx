// billede + titel + beskrivelse + tid + portioner + tags
import { useRef, useState } from "react";
import cameraIcon from "/assets/icon/illu-camera-green.svg";
import styles from "../CreatePage.module.css";
 import WheelPicker from "../../../components/WheelPicker";
 import useAutoFitText from "../../../hooks/useAutoFitText";
const ALL_TAGS = [
  "Budget",
  "Hurtigt & nemt",
  "Vegetar",
  "Asiatisk",
  "Pasta",
  "Mexicansk",
  "Morgenmad",
  "Favorit",
  "Mors Køkken",
];

export default function BasicsSection({
  image,
  setImage,
  title,
  setTitle,
  description,
  setDescription,
  timeMin,
  setTimeMin,
  servings,
  setServings,
  tags,
  setTags,
}) {
  const fileRef = useRef(null);
  // ⬅️ NYT: reference til titel-input
  const titleRef = useRef(null);

  // ⬅️ NYT: auto-fit når title ændrer sig
  useAutoFitText(titleRef, [title], {
    max: 1.8, // svarer til din normale overskriftsstørrelse
    min: 1.0, // hvor lille vi må gå ned
    step: 0.05,
    unit: "rem",
    pad: 0,
  });

  // picker-states
  const [openTime, setOpenTime] = useState(false);
  const [openServings, setOpenServings] = useState(false);

  function pickFile() {
    fileRef.current?.click();
  }
  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result);
    r.readAsDataURL(f);
  }
  function toggleTag(tag) {
    setTags(
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
    );
  }

  return (
    <section>
      {/* billede */}
      <div className={styles.imageBox} onClick={pickFile} role="button">
        {image ? (
          <img className={styles.image} src={image} alt="" />
        ) : (
          <img className={styles.camera} src={cameraIcon} alt="Vælg billede" />
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className={styles.hidden}
        onChange={onFileChange}
      />

      {/* titel */}
      <label className={styles.label}>
        <input
          ref={titleRef}
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
        />
      </label>

      {/* beskrivelse */}
      <label className={styles.label}>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kort beskrivelse..."
        />
      </label>

      {/* tid + portioner */}
      <div className={styles.row}>
        {/* TID */}
        <button
          type="button"
          className={`${styles.number} ${styles.col}`}
          onClick={() => setOpenTime(true)}
        >
          {timeMin ? `${timeMin} min` : "Tid"}
        </button>

        {/* PORTIONER */}
        <button
          type="button"
          className={`${styles.number} ${styles.col}`}
          onClick={() => setOpenServings(true)}
        >
          {servings ? `${servings} pers.` : "Portioner"}
        </button>
      </div>

      {/* tags */}
      <h2 className={styles.tagsTitle}>Tilføj Tags</h2>
      <div className={styles.tags}>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`${styles.chip} ${
              tags.includes(tag) ? styles.chipActive : ""
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* WheelPicker til TID */}
      <WheelPicker
        label="Tid"
        open={openTime}
        onClose={() => setOpenTime(false)}
        valuesLeft={[...Array(24).keys()]} // 0–23 timer
        valuesRight={[...Array(12)].map((_, i) => i * 5)} // 0,5,10,...55 minutter
        onConfirm={(h, m) => {
          const formatted = `${h}t ${m.toString().padStart(2, "0")}m`;
          setTimeMin(formatted);
        }}
      />

      {/* WheelPicker til PORTIONER */}
      <WheelPicker
        label="Portioner"
        open={openServings}
        onClose={() => setOpenServings(false)}
        valuesLeft={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        onConfirm={(v) => setServings(v)}
      />
    </section>
  );
}