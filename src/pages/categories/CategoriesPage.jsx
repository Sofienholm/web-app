import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CategoriesPage.module.css";
import FilterSheet from "./FilterSheet.jsx";

const CATEGORIES = [
  { slug: "Asiatisk",  icon: "/assets/categori/ic-category-asiatisk.svg" },
  { slug: "Favorit",   icon: "/assets/categori/ic-category-favorit.svg" },
  { slug: "Pasta",     icon: "/assets/categori/ic-category-pasta.svg" },
  { slug: "Hurtigt & Nemt",   icon: "/assets/categori/ic-category-hurtig.svg" },
  { slug: "Mexicansk", icon: "/assets/categori/ic-category-mexi.svg" },
  { slug: "Vegetar",   icon: "/assets/categori/ic-category-vegie.svg" },
  { slug: "Mors Køkken",      icon: "/assets/categori/ic-category-moms-kitchen.svg" },
  { slug: "Budget",    icon: "/assets/categori/ic-category-budget.svg" },
  { slug: "Morgenmad", icon: "/assets/categori/ic-category-morgenmad.svg" },
];

export default function CategoriesPage() {
  const navigate = useNavigate();

  // venstre / højre kolonne (forskudt)
  const left  = CATEGORIES.filter((_, i) => i % 2 === 0);
  const right = CATEGORIES.filter((_, i) => i % 2 === 1);

  // gå til simpel kategori-resultatside (direkte på ét tag)
  const goTo = (slug) => {
    navigate(`/categories/result?cat=${encodeURIComponent(slug)}`);
  };

  // filter sheet state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // globale filtre (kan bruges hvis du vil vise "aktive filtre" i UI senere)
  const [filters, setFilters] = useState({
    sort: null,   // <-- var "recent", nu null så ingen er valgt fra start
    time: null,   // "<30" | "60-90" | ">90" | null
    tags: [],     // ["Pasta","Vegetar",...]
  });

  // kaldes når man trykker "TILFØJ" i sheet'et
  function applyFilters(newFilters) {
    setFilters(newFilters);
    setIsFilterOpen(false);

    // byg query params til /categories/filter
    const params = new URLSearchParams();

    if (newFilters.sort) {
      params.set("sort", newFilters.sort);
    }
    if (newFilters.time) {
      params.set("time", newFilters.time);
    }
    if (newFilters.tags.length > 0) {
      params.set("tags", newFilters.tags.join(",")); // "Pasta,Vegetar"
    }

    navigate(`/categories/filter?${params.toString()}`);
  }

  return (
    <div className={styles.page}>
      {/* filter-knap */}
      <button
        type="button"
        className={styles.filterBtn}
        aria-label="Filtrér"
        onClick={() => setIsFilterOpen(true)}
      >
        <img
          src="/assets/icon/ic-filter-symbol.svg"
          alt=""
          className={styles.filterIcon}
          aria-hidden="true"
        />
      </button>

      {/* forskudt to-kolonne grid */}
      <div className={styles.columns}>
        <div className={styles.col}>
          {left.map((cat) => (
            <button
              key={cat.slug}
              className={styles.card}
              onClick={() => goTo(cat.slug)}
            >
              <img src={cat.icon} alt="" className={styles.cardImg} />
            </button>
          ))}
        </div>

        <div className={`${styles.col} ${styles.colOffset}`}>
          {right.map((cat) => (
            <button
              key={cat.slug}
              className={styles.card}
              onClick={() => goTo(cat.slug)}
            >
              <img src={cat.icon} alt="" className={styles.cardImg} />
            </button>
          ))}
        </div>
      </div>

      {/* filter overlay sheet */}
      {isFilterOpen && (
        <FilterSheet
          initialFilters={filters}
          onClose={() => setIsFilterOpen(false)}
          onApply={applyFilters}
        />
      )}
    </div>
  );
}
