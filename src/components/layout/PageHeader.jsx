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

  // når brugeren trykker Enter i søgefeltet
  function handleKeyDown(e) {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue(""); // valgfrit: ryd feltet bagefter
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
          <img src={searchIcon} alt="" className={styles.searchIcon} />
        </div>

        {/* profil-knap der navigerer til /profile */}
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleRight ${styles.headerProfilePos || ""}`}
          onClick={() => navigate("/profile")}
          aria-label="Gå til profil"
        >
          <img
            src={avatarToShow}
            alt=""
            className="bubbleIconLg"
          />
        </button>
      </div>
    </header>
  );
}
