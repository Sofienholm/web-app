import React from "react";
import { NavLink, useNavigate } from "react-router";
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
            className={styles.searchIcon}
          />
        </div>

        {/* Profil-knap der navigerer til /profile */}
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleRight ${styles.headerProfilePos}`}
          onClick={() => navigate("/profile")}
          aria-label="Gå til profil"
        >
          <img
            src={profileIcon}
            alt=""
            className="bubbleIconLg"
          />
        </button>
      </div>
    </header>
  );
}
