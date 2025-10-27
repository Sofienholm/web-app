import React from "react";
import { useLocation, useNavigate } from "react-router";
import useSearchRecipes from "../../hooks/useSearchRecipes.js";
import styles from "./SearchPage.module.css";

import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // læs ?q=... fra url
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  const results = useSearchRecipes(q);

  return (
    <div className={styles.page}>
      {/* HEADER ROW: tilbage-knap + tekst */}
      <div className={styles.headerRow}>
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed || ""}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>

        <div className={styles.headerTextBlock}>
          <div className={styles.headingInlineLabel}>Søger efter:</div>
          <div className={styles.headingInlineValue}>{q}</div>
        </div>
      </div>

      {/* LISTE / EMPTY */}
     {results.length === 0 ? (
  <div className={styles.illustrationWrap}>
    <img
      src="../public/assets/illustrations/illu-404.svg"
      alt="Ingen opskrifter fundet"
      className={styles.illustration}
    />
  </div>
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
