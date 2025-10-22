import React from "react";
import { useNavigate } from "react-router";
import styles from "./PageHeader.module.css";

// Ikoner fra public/
import searchIcon from "../../../public/assets/icon/ic-search-symbol.svg";
import profileIcon from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

export default function PageHeader() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.searchWrap}>
          <input
            id="recipe-search"
            type="search"
            placeholder="Find en af dine opskrifter"
            className={styles.searchInput}
          />
          <img
            src={searchIcon}
            alt=""
            aria-hidden="true"
            className={styles.searchIcon}
          />
        </div>

        {/* NY: profil-knap til højre for søgefeltet */}
        <button
          type="button"
          className={styles.profileButton}
          aria-label="Gå til profil"
          onClick={() => navigate("/profile")}
        >
          <img
            src={profileIcon}
            alt=""
            aria-hidden="true"
            className={styles.profileIcon}
          />
        </button>
      </div>
    </header>
  );
}
