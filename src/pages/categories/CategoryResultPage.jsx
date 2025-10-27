import React from "react";
import { useLocation, useNavigate } from "react-router";
import useRecipesByTag from "../../hooks/useRecipesByTag.js";
import styles from "./CategoryResultPage.module.css";

export default function CategoryResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // læs ?cat=... fra URL'en (fx "asiatisk")
  const params = new URLSearchParams(location.search);
  const tag = params.get("cat") || "";

  // hent opskrifter for den kategori vha hooken
  const recipes = useRecipesByTag(tag);

  return (
    <div className={styles.page}>
      {/* tilbage-knap øverst */}
      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        ←
      </button>

      {/* overskrift */}
      <h1 className={styles.heading}>
        {tag ? `Kategori: ${tag}` : "Kategori"}
      </h1>

      {/* tom tilstand */}
      {recipes.length === 0 ? (
        <p className={styles.empty}>
          Ingen opskrifter i den kategori endnu…
        </p>
      ) : (
        <ul className={styles.list}>
          {recipes.map((r) => (
            <li key={r.id} className={styles.item}>
              <div className={styles.card}>
                {/* billede / fallback */}
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

                {/* tekst */}
                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>
                    {r.title || "Uden titel"}
                  </div>

                  <div className={styles.cardMeta}>
                    {/* tid */}
                    {r.timeMinutes ? `${r.timeMinutes} min` : "Ukendt tid"}

                    {/* portions */}
                    {r.portions ? ` · ${r.portions} pers.` : ""}

                    {/* tags */}
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
