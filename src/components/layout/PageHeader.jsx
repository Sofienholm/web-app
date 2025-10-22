import React from "react";
import styles from "./PageHeader.module.css";


import searchIcon from "../../../public/assets/icon/ic-search-symbol.svg";

export default function PageHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.searchWrap}>
        <input
          id="recipe-search"
          type="search"
          placeholder="Find en af dine opskrifter"
          className={styles.searchInput}
        />
        {/* Lup-ikon (SVG fra public/) */}
        <img
          src={searchIcon}
          alt=""
          aria-hidden="true"
          className={styles.searchIcon}
        />
      </div>
    </header>
  );
}
