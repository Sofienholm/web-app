// -- IMPORTS --
import React, { useState, useEffect } from "react";
import styles from "./FilterSheet.module.css";
import closeBtn from "/assets/icon/ic-add-symbol.svg";

// -- COMPONENT: FilterSheet --
export default function FilterSheet({ initialFilters, onClose, onApply }) {
  // -- STATE: lokale filtre + visning --
  const [localFilters, setLocalFilters] = useState(initialFilters); // lokalt arbejdskopi af filtre
  const [isVisible, setIsVisible] = useState(false); // styrer slide-in/out

  // -- EFFECT: sheet slider op lige efter mount --
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 0); // trig overgang i næste tick
    return () => clearTimeout(t);
  }, []);

  // -- HANDLER: luk (slide ned + fade overlay) --
  function handleClose() {
    setIsVisible(false); // start exit-animation
    setTimeout(() => {
      onClose(); // informer parent når animation er færdig
    }, 250); // matcher CSS transition speed
  }

  // -- HANDLER: klik på baggrunden = luk --
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  // -- HANDLER: toggle sort (A–Z / SENESTE) --
  // klik igen på aktiv = fjern, så ingen er valgt hvis initialFilters.sort === null
  function selectSort(value) {
    setLocalFilters((f) => ({
      ...f,
      sort: f.sort === value ? null : value,
    }));
  }

  // -- HANDLER: toggle tidsfilter --
  function selectTime(value) {
    setLocalFilters((f) =>
      f.time === value ? { ...f, time: null } : { ...f, time: value }
    );
  }

  // -- HANDLER: toggle tag --
  function toggleTag(tag) {
    setLocalFilters((f) => {
      const hasIt = f.tags.includes(tag);
      return {
        ...f,
        tags: hasIt ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
      };
    });
  }

  // -- HANDLER: "TILFØJ" -> send valgene tilbage til parent --
  function handleApply() {
    onApply(localFilters); // giv de valgte filtre tilbage
  }

  // -- KONSTANT: tilgængelige tags (vælg fra denne liste) --
  const ALL_TAGS = [
    "Budget",
    "Hurtigt & nemt",
    "Vegetar",
    "Pasta",
    "Asiatisk",
    "Favorit",
    "Mors køkken",
    "Morgenmad",
    "Mexicansk",
  ];

  // -- RENDER --
  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ""}`}
      onClick={handleOverlayClick} // klik på overlay lukker
      role="dialog"
      aria-modal="true"
    >
      <div className={`${styles.sheet} ${isVisible ? styles.sheetVisible : ""}`}>
        {/* -- HEADER -- */}
        <header className={styles.sheetHeader}>
          <h1 className={styles.title}>FILTER</h1>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose} // luk via knap
            aria-label="Luk"
          >
            {/* plus-ikonet roteret 45°, stylet i .closeIcon */}
            <img src={closeBtn} alt="" className={styles.closeIcon} />
          </button>
        </header>

        {/* -- SORTERING (A–Z / SENESTE) -- */}
        <section className={styles.sortRowWrapper}>
          <div className={styles.sortRow}>
            <button
              type="button"
              className={`${styles.sortPill} ${
                localFilters.sort === "az" ? styles.sortPillActive : ""
              }`}
              onClick={() => selectSort("az")}
            >
              A–Z
            </button>

            <button
              type="button"
              className={`${styles.sortPill} ${
                localFilters.sort === "recent" ? styles.sortPillActive : ""
              }`}
              onClick={() => selectSort("recent")}
            >
              SENESTE
            </button>
          </div>
        </section>

        {/* -- TID -- */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionLabel}>TID</div>
          <div className={styles.timeRow}>
            <button
              type="button"
              className={`${styles.timeChip} ${
                localFilters.time === ">30" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime(">30")}
            >
              {">30 MIN"}
            </button>

            <button
              type="button"
              className={`${styles.timeChip} ${
                localFilters.time === "30-90" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime("30-90")}
            >
              30–90 MIN
            </button>

            <button
              type="button"
              className={`${styles.timeChip} ${
                localFilters.time === "90<" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime("90<")}
            >
              {"90 MIN<"}
            </button>
          </div>
        </section>

        {/* -- TAGS -- */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionLabel}>TAGS</div>
          <div className={styles.tagsWrap}>
            {ALL_TAGS.map((tag) => {
              const active = localFilters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)} // til/fra vælg tag
                  className={`${styles.tagPill} ${
                    active ? styles.tagPillActive : ""
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* -- CTA KNAP -- */}
        <footer className={styles.footerArea}>
          <button
            type="button"
            className={styles.applyBtn}
            onClick={handleApply} // anvend valgte filtre
          >
            TILFØJ
          </button>
        </footer>
      </div>
    </div>
  );
}
