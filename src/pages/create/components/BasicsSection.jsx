// -- IMPORTS --
import { useRef, useState } from "react";
import cameraIcon from "/assets/icon/illu-camera-green.svg";
import styles from "../CreatePage.module.css";
import WheelPicker from "../../../components/WheelPicker";
import useAutoFitText from "../../../hooks/useAutoFitText";

// -- KONSTANT: TILGÆNGELIGE TAGS --
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

// -- BASICS SECTION COMPONENT --
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
  // -- REFS --
  const fileRef = useRef(null); // reference til skjult filinput
  const titleRef = useRef(null); // reference til titel-input (bruges til auto-fit)

  // -- AUTO FIT TITLE --
  // Justerer titelstørrelsen dynamisk afhængig af længden
  useAutoFitText(titleRef, [title], {
    max: 1.8, // normal overskriftsstørrelse
    min: 1.0, // minimum fontstørrelse
    step: 0.05,
    unit: "rem",
    pad: 0,
  });

  // -- PICKER STATES --
  // Styrer åbne/lyst-tilstand for tid og portioner
  const [openTime, setOpenTime] = useState(false);
  const [openServings, setOpenServings] = useState(false);

  // -- FILHÅNDTERING --
  // Åbn filvælger
  function pickFile() {
    fileRef.current?.click();
  }

  // Håndter billedupload
  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result);
    r.readAsDataURL(f);
  }

  // -- TAG HÅNDTERING --
  // Tilføj eller fjern tags fra listen
  function toggleTag(tag) {
    setTags(
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
    );
  }

  // -- RENDER OUTPUT --
  return (
    <section>
      {/* -- BILLEDESEKTION -- */}
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

      {/* -- TITEL -- */}
      <label className={styles.label}>
        <input
          ref={titleRef}
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
        />
      </label>

      {/* -- BESKRIVELSE -- */}
      <label className={styles.label}>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kort beskrivelse..."
        />
      </label>

      {/* -- TID OG PORTIONER -- */}
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

      {/* -- TAGS -- */}
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

      {/* -- WHEEL PICKER: TID -- */}
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

      {/* -- WHEEL PICKER: PORTIONER -- */}
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
