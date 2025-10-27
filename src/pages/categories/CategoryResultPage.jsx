import React from "react";
import { useLocation, useNavigate } from "react-router";
import useRecipesByTag from "../../hooks/useRecipesByTag.js";
import styles from "./CategoryResultPage.module.css";

import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function CategoryResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ?cat=asiatisk
  const params = new URLSearchParams(location.search);
  const tag = params.get("cat") || "";

  const recipes = useRecipesByTag(tag);

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
          <div className={styles.headingInlineLabel}>Kategori</div>
          <div className={styles.headingInlineValue}>
            {tag || "Kategori"}
          </div>
        </div>
      </div>

      {/* EMPTY / RESULTS */}
      {recipes.length === 0 ? (
  <div className={styles.illustrationWrap}>
    <img
      src="../public/assets/illustrations/illu-404.svg"
      alt="Ingen opskrifter fundet i denne kategori"
      className={styles.illustration}
    />
  </div>
) : (
        <ul className={styles.list}>
          {recipes.map((r) => (
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
                    <div className={styles.cardImgPlaceholder}>🍽</div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>
                    {r.title || "Uden titel"}
                  </div>
                  <div className={styles.cardMeta}>
                    {r.timeMinutes ? `${r.timeMinutes} min` : "Ukendt tid"}
                    {r.portions ? ` · ${r.portions} pers.` : ""}
                    {r.tags?.length
                      ? ` · ${r.tags.slice(0, 2).join(", ")}`
                      : ""}
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
