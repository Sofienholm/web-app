import React from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "./FilteredResultPage.module.css";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

// TODO: når du har hook til filtreret fetch, importer den og brug den under resume

export default function FilteredResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const sort = params.get("sort") || "";
  const time = params.get("time") || "";
  const tagsParam = params.get("tags") || "";
  const tags = tagsParam ? tagsParam.split(",") : [];

  // lav en lille "resume" tekst af hvad der er valgt
  // fx "<30 MIN · Pasta, Vegetar"
  const bits = [];
  if (time) bits.push(time === "<30" ? "<30 MIN" : time === "60-90" ? "60-90 MIN" : ">90 MIN");
  if (tags.length) bits.push(tags.join(", "));
  if (sort === "az") bits.push("A–Z");
  if (sort === "recent") bits.push("Seneste");

  const summary = bits.length > 0 ? bits.join(" · ") : "Filtrerede opskrifter";

  // TODO: her ville du kalde din filtrerede hook og mappe results ligesom i CategoryResultPage/SearchPage
  const results = []; // placeholder indtil du laver hooken

  return (
    <div className={styles.page}>
      {/* HEADER ROW: tilbage-knap + resume-tekst */}
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
          <div className={styles.headingInlineLabel}>Filter</div>
          <div className={styles.headingInlineValue}>{summary}</div>
        </div>
      </div>

     {results.length === 0 ? (
  <div className={styles.illustrationWrap}>
    <img
      src="../public/assets/illustrations/illu-404.svg"
      alt="Ingen opskrifter matcher dine filtre"
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
                    <div className={styles.cardImgPlaceholder}>🍽</div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>
                    {r.title || "Uden titel"}
                  </div>
                  <div className={styles.cardMeta}>
                    {r.timeMinutes ? `${r.timeMinutes} min` : "Ukendt tid"}
                    {r.tags?.length
                      ? " · " + r.tags.slice(0, 2).join(", ")
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
