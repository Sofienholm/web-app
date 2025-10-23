import React from "react";
import { useNavigate } from "react-router";
import styles from "./CategoriesPage.module.css";

const CATEGORIES = [
  { slug: "asiatisk",  icon: "/assets/categori/ic-category-asiatisk.svg" },
  { slug: "favorit",   icon: "/assets/categori/ic-category-favorit.svg" },
  { slug: "pasta",     icon: "/assets/categori/ic-category-pasta.svg" },
  { slug: "hurtigt",   icon: "/assets/categori/ic-category-hurtig.svg" },
  { slug: "mexicansk", icon: "/assets/categori/ic-category-mexi.svg" },
  { slug: "vegetar",   icon: "/assets/categori/ic-category-vegie.svg" },
  { slug: "mors",      icon: "/assets/categori/ic-category-moms-kitchen.svg" },
  { slug: "budget",    icon: "/assets/categori/ic-category-budget.svg" },
  { slug: "morgenmad", icon: "/assets/categori/ic-category-morgenmad.svg" },
];

export default function CategoriesPage() {
  const navigate = useNavigate();

  const left  = CATEGORIES.filter((_, i) => i % 2 === 0);
  const right = CATEGORIES.filter((_, i) => i % 2 === 1);

  const goTo = (slug) => navigate(`/categories?cat=${encodeURIComponent(slug)}`);

  return (
    <div className={styles.page}>
      <button type="button" className={styles.filterBtn} aria-label="Filtrér">
        <img
          src="/assets/icon/ic-filter-symbol.svg"
          alt=""
          className={styles.filterIcon}
          aria-hidden="true"
        />
      </button>

      {/* To kolonner: højre er forskudt en halv kort-højde */}
      <div className={styles.columns}>
        <div className={styles.col}>
          {left.map((cat) => (
            <button key={cat.slug} className={styles.card} onClick={() => goTo(cat.slug)}>
              <img src={cat.icon} alt="" className={styles.cardImg} />
            </button>
          ))}
        </div>

        <div className={`${styles.col} ${styles.colOffset}`}>
          {right.map((cat) => (
            <button key={cat.slug} className={styles.card} onClick={() => goTo(cat.slug)}>
              <img src={cat.icon} alt="" className={styles.cardImg} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
