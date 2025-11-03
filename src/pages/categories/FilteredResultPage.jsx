import { useLocation, useNavigate } from "react-router";
import useFilteredRecipes from "../../hooks/useFilteredRecipes.js";
import styles from "./FilteredResultPage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";
import { getAuth } from "firebase/auth";

export default function FilteredResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const params = new URLSearchParams(location.search);
  const sort = params.get("sort") || "";
  const time = params.get("time") || "";
  const tagsParam = params.get("tags") || "";
  const tags = tagsParam ? tagsParam.split(",") : [];

  const bits = [];
  if (time)
    bits.push(
      time === "<30" ? "<30 MIN" : time === "60-90" ? "60–90 MIN" : ">90 MIN"
    );
  if (tags.length) bits.push(tags.join(", "));
  if (sort === "az") bits.push("A–Z");
  if (sort === "recent") bits.push("Seneste");
  const summary = bits.length > 0 ? bits.join(" · ") : "Filtrerede opskrifter";

  const filters = { sort, time, tags };

  const results = useFilteredRecipes(filters, userId);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${
            styles.backButtonFixed || ""
          }`}
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
            src="/assets/illustrations/illu-404.svg"
            alt="Ingen opskrifter matcher dine filtre"
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
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/recipe/${r.id}`)
                }
              >
                <div className={styles.cardImgWrap}>
                  {r.image ? (
                    <img
                      src={r.image}
                      alt={r.title}
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
                    {r.timeMin || "Ukendt tid"}
                    {r.servings ? ` · ${r.servings} pers.` : ""}
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
