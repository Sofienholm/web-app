import React, { useState, useEffect } from "react";
import styles from "./FilterSheet.module.css";

import closeIcon from "../../../public/assets/icon/ic-add-symbol.svg"; 
// ^ samme ikon som plus-knappen i bottomnav, vi roterer det i CSS

export default function FilterSheet({ initialFilters, onClose, onApply }) {
  const [localFilters, setLocalFilters] = useState(initialFilters);
  const [isVisible, setIsVisible] = useState(false);

  // når sheet mountes -> start fade/slide ind
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(t);
  }, []);

  function beginClose() {
    // start animation ned
    setIsVisible(false);
    // vent til CSS transition er færdig
    setTimeout(() => {
      onClose();
    }, 400); // skal matche transition-duration i CSS nu (0.4s)
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      beginClose();
    }
  }

  function selectSort(value) {
    setLocalFilters((f) => ({ ...f, sort: value }));
  }

  function selectTime(value) {
    setLocalFilters((f) =>
      f.time === value ? { ...f, time: null } : { ...f, time: value }
    );
  }

  function toggleTag(tag) {
    setLocalFilters((f) => {
      const hasIt = f.tags.includes(tag);
      return {
        ...f,
        tags: hasIt
          ? f.tags.filter((t) => t !== tag)
          : [...f.tags, tag],
      };
    });
  }

  function handleApply() {
    onApply(localFilters);
  }

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
    >
      <div
        className={`${styles.sheet} ${
          isVisible ? styles.sheetVisible : ""
        }`}
      >
        {/* Header area (title centered, close icon absolute in corner) */}
        <div className={styles.sheetHeader}>
          <h2 className={styles.title}>FILTER</h2>
          <button
            className={styles.closeBtn}
            onClick={beginClose}
            aria-label="Luk filter"
          >
            <img
              src={closeIcon}
              alt=""
              className={styles.closeIcon}
            />
          </button>
        </div>

        {/* sortering */}
        <div className={styles.sortRowWrapper}>
          <div className={styles.sortRow}>
            <button
              className={`${styles.sortPill} ${
                localFilters.sort === "az" ? styles.sortPillActive : ""
              }`}
              onClick={() => selectSort("az")}
            >
              A–Z
            </button>

            <button
              className={`${styles.sortPill} ${
                localFilters.sort === "recent" ? styles.sortPillActive : ""
              }`}
              onClick={() => selectSort("recent")}
            >
              SENESTE
            </button>
          </div>
        </div>

        {/* TID */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionLabel}>TID</div>

          <div className={styles.timeRow}>
            <button
              className={`${styles.timeChip} ${
                localFilters.time === "<30" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime("<30")}
            >
              &lt;30 MIN
            </button>

            <button
              className={`${styles.timeChip} ${
                localFilters.time === "60-90" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime("60-90")}
            >
              60-90 MIN
            </button>

            <button
              className={`${styles.timeChip} ${
                localFilters.time === ">90" ? styles.timeChipActive : ""
              }`}
              onClick={() => selectTime(">90")}
            >
              &gt;90 MIN
            </button>
          </div>
        </div>

        {/* TAGS */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionLabel}>TAGS</div>

          <div className={styles.tagsWrap}>
            {ALL_TAGS.map((tag) => {
              const active = localFilters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  className={`${styles.tagPill} ${
                    active ? styles.tagPillActive : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.footerArea}>
          <button className={styles.applyBtn} onClick={handleApply}>
            TILFØJ
          </button>
        </div>
      </div>
    </div>
  );
}
