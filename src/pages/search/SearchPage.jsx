import React from "react";
import { useLocation, useNavigate } from "react-router";
import useSearchRecipes from "../../hooks/useSearchRecipes.js";
import styles from "./SearchPage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  const results = useSearchRecipes(q);

  return (
    <div className={styles.page}>
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

      {results.length === 0 ? (
        <div className={styles.illustrationWrap}>
          <img
            src="/assets/illustrations/illu-404.svg"
            alt="Ingen opskrifter fundet"
            className={styles.illustration}
          />
        </div>
      ) : (
        <ul className={styles.list}>
          {results.map((r) => (
            <li key={r.id} className={styles.item}>
              <div
                className={styles.card}
                onClick={() => navigate(`/recipe/${r.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/recipe/${r.id}`)}
              >
                <div className={styles.cardImgWrap}>
                  {r.image ? (
                    <img src={r.image} alt={r.title} className={styles.cardImg} />
                  ) : (
                    <div className={styles.cardImgPlaceholder}>🍲</div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>{r.title || "Uden titel"}</div>
                  <div className={styles.cardMeta}>
                    {r.timeMin || "Ukendt tid"}
                    {r.servings ? ` · ${r.servings} pers.` : ""}
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
