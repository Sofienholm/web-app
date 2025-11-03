// src/components/layout/PageHeader.jsx

// -- IMPORTS --
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { onProfileSnapshot } from "../../services/profile.js";
import styles from "./PageHeader.module.css";

// -- ASSETS --
import searchIcon from "../../../public/assets/icon/ic-search-symbol.svg";
import defaultProfileIcon from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

// -- COMPONENT: PageHeader --
export default function PageHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // -- STATE: søgeværdi + avatar --
  const [searchValue, setSearchValue] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(defaultProfileIcon);

  // -- EFFECT: hold avatar opdateret via profil-snapshot --
  useEffect(() => {
    if (!user?.uid) {
      setAvatarUrl(defaultProfileIcon); // fallback når ingen bruger
      return;
    }
    const unsub = onProfileSnapshot(user.uid, (profile) => {
      setAvatarUrl(profile?.avatarUrl || defaultProfileIcon); // brug profil-ikon hvis sat
    });
    return unsub; // ryd op ved unmount
  }, [user?.uid]);

  // -- HANDLERS: kør søgning --
  function runSearch() {
    const term = searchValue.trim();
    if (term) {
      navigate(`/search?q=${encodeURIComponent(term)}`); // gå til søgeside
      setSearchValue(""); // nulstil felt
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") runSearch(); // enter indsender søgning
  }

  // -- RENDER --
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.searchWrap}>
          <input
            id="recipe-search"
            type="search"
            placeholder="Find en af dine opskrifter"
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // opdater input
            onKeyDown={handleKeyDown} // enter = søg
          />
          <button
            type="button"
            className={styles.searchButton}
            onClick={runSearch} // klik = søg
            aria-label="Søg"
          >
            <img src={searchIcon} alt="" className={styles.searchIcon} />
          </button>
        </div>

        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleRight ${
            styles.headerProfilePos || ""
          }`}
          onClick={() => navigate("/profile")} // gå til profil
          aria-label="Gå til profil"
        >
          <img src={avatarUrl} alt="Profil" className="bubbleIconLg" />
        </button>
      </div>
    </header>
  );
}
