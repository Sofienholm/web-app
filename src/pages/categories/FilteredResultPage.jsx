import React from "react";
import { useNavigate, useLocation } from "react-router";
import useFilteredRecipes from "../../hooks/useFilteredRecipes.js";
import styles from "./FilteredResultPage.module.css";

function parseFiltersFromQuery(search) {
  const params = new URLSearchParams(search);

  const sort = params.get("sort") || "recent";
  const time = params.get("time") || null;

  const rawTags = params.get("tags") || "";
  const tags = rawTags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return { sort, time, tags };
}

export default function FilteredResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // få filters fra URL'en
  const filters = parseFiltersFromQuery(location.search);

  // hent opskrifter baseret på de filtre
  const recipes = useFilteredRecipes(filters);

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

      <h1 className={styles.heading}>Resultat</h1>

      {/* Vis hvad der er valgt (debug / feedback til bruger) */}
      <div className={styles.activeFilters}>
        {filters.sort && <span>Sort: {filters.sort}</span>}
        {filters.time && <span>• Tid: {filters.time}</span>}
        {filters.tags.length > 0 && (
          <span>• Tags: {filters.tags.join(", ")}</span>
        )}
      </div>

      {/* Hvis ingen resultater */}
      {recipes.length === 0 ? (
        <p className={styles.empty}>
          Ingen opskrifter matcher dine filtre…
        </p>
      ) : (
        <ul className={styles.list}>
          {recipes.map((r) => (
            <li key={r.id} className={styles.item}>
              <div className={styles.card}>
                {/* billede */}
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
