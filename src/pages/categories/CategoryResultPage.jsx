import { useLocation, useNavigate } from "react-router";
import useRecipesByTag from "../../hooks/useRecipesByTag.js";
import styles from "./CategoryResultPage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";
import { getAuth } from "firebase/auth";

export default function CategoryResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // læs ?cat=... fra URL
  const params = new URLSearchParams(location.search);
  const tag = params.get("cat") || "";
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // ← rigtige Firebase bruger-ID

  // hent opskrifter for valgte kategori
  const recipes = useRecipesByTag(tag, userId);

  return (
    <div className={styles.page}>
      {/* HEADER */}
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
          <div className={styles.headingInlineLabel}>Kategori</div>
          <div className={styles.headingInlineValue}>{tag || "Kategori"}</div>
        </div>
      </div>

      {/* RESULTATER */}
      {recipes.length === 0 ? (
        <div className={styles.illustrationWrap}>
          <img
            src="/assets/illustrations/illu-404.svg"
            alt="Ingen opskrifter fundet i denne kategori"
            className={styles.illustration}
          />
        </div>
      ) : (
        <ul className={styles.list}>
          {recipes.map((r) => (
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
