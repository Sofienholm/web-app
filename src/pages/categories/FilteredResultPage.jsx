// -- IMPORTS --
import { useLocation, useNavigate } from "react-router";
import useFilteredRecipes from "../../hooks/useFilteredRecipes.js";
import styles from "./FilteredResultPage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";
import noRusult from "/assets/illustrations/illu-404.svg";
import { getAuth } from "firebase/auth";

// -- COMPONENT: FilteredResultPage --
export default function FilteredResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // -- AUTH: aktuelt bruger-ID fra Firebase --
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // -- URL PARAMS: læs filtre fra querystring --
  const params = new URLSearchParams(location.search);
  const sort = params.get("sort") || ""; // "az" | "recent" | ""
  const time = params.get("time") || ""; // "<30" | "60-90" | ">90" | ""
  const tagsParam = params.get("tags") || ""; // "Pasta,Vegetar"
  const tags = tagsParam ? tagsParam.split(",") : []; // array af tags

  // -- UI: byg læsbar oversigt over aktive filtre --
  const bits = [];
  if (time)
    bits.push(
      time === "<30" ? "<30 MIN" : time === "60-90" ? "60–90 MIN" : ">90 MIN"
    );
  if (tags.length) bits.push(tags.join(", "));
  if (sort === "az") bits.push("A–Z");
  if (sort === "recent") bits.push("Seneste");
  const summary = bits.length > 0 ? bits.join(" · ") : "Filtrerede opskrifter";

  // -- FILTER OBJEKT (til hook) --
  const filters = { sort, time, tags };

  // -- DATA: hent filtrerede opskrifter for bruger --
  const results = useFilteredRecipes(filters, userId);

  // -- RENDER --
  return (
    <div className={styles.page}>
      {/* -- HEADER: tilbage-knap + filter-sammendrag -- */}
      <div className={styles.headerRow}>
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${
            styles.backButtonFixed || ""
          }`}
          onClick={() => navigate(-1)} // gå én side tilbage
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>

        <div className={styles.headerTextBlock}>
          <div className={styles.headingInlineLabel}>Filter</div>
          <div className={styles.headingInlineValue}>{summary}</div>
        </div>
      </div>

      {/* -- RESULTATER: tomt-state vs. liste -- */}
      {results.length === 0 ? (
        // -- TOMT STATE: ingen træffere --
        <div className={styles.illustrationWrap}>
          <img
            src={noRusult}
            alt="Ingen opskrifter matcher dine filtre"
            className={styles.illustration}
          />
        </div>
      ) : (
        // -- LISTE: kort pr. opskrift --
        <ul className={styles.list}>
          {results.map((r) => (
            <li key={r.id} className={styles.item}>
              <div
                className={styles.card}
                onClick={() => navigate(`/recipe/${r.id}`)} // gå til opskrift
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/recipe/${r.id}`) // keyboard support
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
                      ? " · " + r.tags.slice(0, 2).join(", ") // vis 1-2 tags
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
