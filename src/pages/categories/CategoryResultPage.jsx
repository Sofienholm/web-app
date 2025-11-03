// -- IMPORTS --
import { useLocation, useNavigate } from "react-router";
import useRecipesByTag from "../../hooks/useRecipesByTag.js";
import styles from "./CategoryResultPage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";
import noRusult from "/assets/illustrations/illu-404.svg"; // beholdt navnet uændret
import { getAuth } from "firebase/auth";

// -- COMPONENT: CategoryResultPage --
export default function CategoryResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // -- URL PARAMS: læs ?cat=... fra URL --
  const params = new URLSearchParams(location.search);
  const tag = params.get("cat") || ""; // fallback til tom streng

  // -- AUTH: hent nuværende bruger-ID fra Firebase --
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // rigtige Firebase bruger-ID

  // -- DATA: hent opskrifter for valgt kategori og bruger --
  const recipes = useRecipesByTag(tag, userId); // custom hook der filtrerer på tag + user

  // -- RENDER --
  return (
    <div className={styles.page}>
      {/* -- HEADER: tilbage-knap + kategori-label -- */}
      <div className={styles.headerRow}>
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${
            styles.backButtonFixed || ""
          }`}
          onClick={() => navigate(-1)} // gå én side tilbage i historikken
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>

        <div className={styles.headerTextBlock}>
          <div className={styles.headingInlineLabel}>Kategori</div>
          <div className={styles.headingInlineValue}>{tag || "Kategori"}</div>
        </div>
      </div>

      {/* -- RESULTATER: tomt-state vs. liste -- */}
      {recipes.length === 0 ? (
        // -- TOMT STATE: ingen opskrifter --
        <div className={styles.illustrationWrap}>
          <img
            src={noRusult} // vis 404/empty illustration
            alt="Ingen opskrifter fundet i denne kategori"
            className={styles.illustration}
          />
        </div>
      ) : (
        // -- LISTE: render kort for hver opskrift --
        <ul className={styles.list}>
          {recipes.map((r) => (
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
                      src={r.image} // hent billede-URL fra data
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
                      ? ` · ${r.tags.slice(0, 2).join(", ")}` // vis 1-2 tags
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
