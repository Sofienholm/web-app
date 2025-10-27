import React, { useState, useEffect } from "react";
import styles from "./FilterSheet.module.css";

export default function FilterSheet({ initialFilters, onClose, onApply }) {
  const [localFilters, setLocalFilters] = useState(initialFilters);
  const [isVisible, setIsVisible] = useState(false);

  // sheet slider op lige efter mount
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(t);
  }, []);

  // luk animation (slide ned + fade overlay)
  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 250); // matcher CSS transition speed
  }

  // klik på baggrunden = luk
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  // toggle sort (så A–Z / SENESTE kan vælges FRA og TIL,
  // og ingen er aktiv fra start hvis initialFilters.sort === null)
  function selectSort(value) {
    setLocalFilters((f) => ({
      ...f,
      sort: f.sort === value ? null : value,
    }));
  }

  // toggle tidsfilter (samme logik: klik igen = fjern)
  function selectTime(value) {
    setLocalFilters((f) =>
      f.time === value ? { ...f, time: null } : { ...f, time: value }
    );
  }

  // toggle tag
  function toggleTag(tag) {
    setLocalFilters((f) => {
      const hasIt = f.tags.includes(tag);
      return {
        ...f,
        tags: hasIt ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
      };
    });
  }

  // "TILFØJ" -> send valgene tilbage til parent
  function handleApply() {
    onApply(localFilters);
  }

  // de tags der kan vælges
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

  return (
    <div
      className={`${styles.overlay} ${
        isVisible ? styles.overlayVisible : ""
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.sheet} ${
          isVisible ? styles.sheetVisible : ""
        }`}
      >
        {/* HEADER */}
        <header className={styles.sheetHeader}>
          <h1 className={styles.title}>FILTER</h1>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Luk"
          >
            {/* plus-ikonet roteret 45°, stylet i .closeIcon */}
            <img
              src="/assets/icon/ic-add-symbol.svg"
              alt=""
              className={styles.closeIcon}
            />
          </button>
        </header>

        {/* SORTERING (A–Z / SENESTE) */}
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

        {/* TID */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionLabel}>TID</div>
          <div className={styles.timeRow}>
            <button
              type="button"
              className={`${styles.timeChip} ${
                localFilters.time === "<30" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime("<30")}
            >
              {"<30 MIN"}
            </button>

            <button
              type="button"
              className={`${styles.timeChip} ${
                localFilters.time === "60-90" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime("60-90")}
            >
              60–90 MIN
            </button>

            <button
              type="button"
              className={`${styles.timeChip} ${
                localFilters.time === ">90" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime(">90")}
            >
              {">90 MIN"}
            </button>
          </div>
        </section>

        {/* TAGS */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionLabel}>TAGS</div>
          <div className={styles.tagsWrap}>
            {ALL_TAGS.map((tag) => {
              const active = localFilters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
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

        {/* CTA KNAP */}
        <footer className={styles.footerArea}>
          <button
            type="button"
            className={styles.applyBtn}
            onClick={handleApply}
          >
            TILFØJ
          </button>
        </footer>
      </div>
    </div>
  );
}
