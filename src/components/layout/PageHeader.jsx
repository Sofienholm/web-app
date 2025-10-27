import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./PageHeader.module.css";

// Ikoner fra public/
import searchIcon from "../../../public/assets/icon/ic-search-symbol.svg";
import defaultProfileIcon from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

export default function PageHeader() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // hent valgt avatar fra localStorage
  const chosen =
    typeof window !== "undefined"
      ? localStorage.getItem("profile.avatarSrc")
      : null;

  const avatarToShow = chosen || defaultProfileIcon;

  // søg og hop til /search?q=...
  function runSearch() {
    const term = searchValue.trim();
    if (term !== "") {
      navigate(`/search?q=${encodeURIComponent(term)}`);
      setSearchValue(""); // valgfrit
    }
  }

  // når brugeren trykker Enter i søgefeltet
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      runSearch();
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* søgefelt */}
        <div className={styles.searchWrap}>
          <input
            id="recipe-search"
            type="search"
            placeholder="Find en af dine opskrifter"
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* klikbart ikon-knap */}
          <button
            type="button"
            className={styles.searchButton}
            onClick={runSearch}
            aria-label="Søg"
          >
            <img src={searchIcon} alt="" className={styles.searchIcon} />
          </button>
        </div>

        {/* profil-knap der navigerer til /profile */}
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleRight ${
            styles.headerProfilePos || ""
          }`}
          onClick={() => navigate("/profile")}
          aria-label="Gå til profil"
        >
          <img src={avatarToShow} alt="" className="bubbleIconLg" />
        </button>
      </div>
    </header>
  );
}
