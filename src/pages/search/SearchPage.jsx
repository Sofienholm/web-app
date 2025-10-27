import React from "react";
import { useLocation, useNavigate } from "react-router";
import useSearchRecipes from "../../hooks/useSearchRecipes.js";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // læs ?q=... fra url
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  const results = useSearchRecipes(q);

  return (
    <div className={styles.page}>
      {/* Tilbage-knap */}
      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        ←
      </button>

      <h1 className={styles.heading}>
        Søger efter: <span className={styles.query}>{q}</span>
      </h1>

      {results.length === 0 ? (
        <p className={styles.empty}>Ingen opskrifter fundet…</p>
      ) : (
        <ul className={styles.list}>
          {results.map((r) => (
            <li key={r.id} className={styles.item}>
              <div className={styles.card}>
                <div className={styles.cardImgWrap}>
                  {r.imageUrl ? (
                    <img
                      src={r.imageUrl}
                      alt=""
                      className={styles.cardImg}
                    />
                  ) : (
                    <div className={styles.cardImgPlaceholder}>🍲</div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>
                    {r.title || "Uden titel"}
                  </div>
                  <div className={styles.cardMeta}>
                    {r.timeMinutes ? `${r.timeMinutes} min` : "Ukendt tid"}
                    {r.tags?.length ? " · " + r.tags.join(", ") : ""}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
