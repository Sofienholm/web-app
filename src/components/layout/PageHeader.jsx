// src/components/layout/PageHeader.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { onProfileSnapshot } from "../../services/profile.js";
import styles from "./PageHeader.module.css";

import searchIcon from "../../../public/assets/icon/ic-search-symbol.svg";
import defaultProfileIcon from "../../../public/assets/illustrations/ill-profil-avatar-man-garlic.svg";

export default function PageHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(defaultProfileIcon);

  useEffect(() => {
    if (!user?.uid) {
      setAvatarUrl(defaultProfileIcon);
      return;
    }
    const unsub = onProfileSnapshot(user.uid, (profile) => {
      setAvatarUrl(profile?.avatarUrl || defaultProfileIcon);
    });
    return unsub;
  }, [user?.uid]);

  function runSearch() {
    const term = searchValue.trim();
    if (term) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
      setSearchValue("");
    }
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") runSearch();
  }

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
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className={styles.searchButton}
            onClick={runSearch}
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
          onClick={() => navigate("/profile")}
          aria-label="Gå til profil"
        >
          <img src={avatarUrl} alt="Profil" className="bubbleIconLg" />
        </button>
      </div>
    </header>
  );
}
