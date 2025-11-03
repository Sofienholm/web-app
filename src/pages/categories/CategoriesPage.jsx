import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CategoriesPage.module.css";
import FilterSheet from "./FilterSheet.jsx";
import useUnlockScroll from "../../hooks/useUnlockScroll";
import asiatisk from "../../../public/assets/categori/ic-category-asiatisk.svg";
import favorit from "../../../public/assets/categori/ic-category-favorit.svg";
import pasta from "../../../public/assets/categori/ic-category-pasta.svg";
import hurtig from "../../../public/assets/categori/ic-category-hurtig.svg";
import mexi from "../../../public/assets/categori/ic-category-mexi.svg";
import vegie from "../../../public/assets/categori/ic-category-vegie.svg";
import momsKitchen from "../../../public/assets/categori/ic-category-moms-kitchen.svg";
import budget from "../../../public/assets/categori/ic-category-budget.svg";
import morgenmad from "../../../public/assets/categori/ic-category-morgenmad.svg";
import plus from "../../../public/assets/categori/ic-category-plus.svg";

const CATEGORIES = [
  { slug: "Asiatisk", icon: asiatisk },
  { slug: "Favorit", icon: favorit },
  { slug: "Pasta", icon: pasta },
  { slug: "Hurtigt & Nemt", icon: hurtig },
  { slug: "Mexicansk", icon: mexi },
  { slug: "Vegetar", icon: vegie },
  { slug: "Mors Køkken", icon: momsKitchen },
  { slug: "Budget", icon: budget },
  { slug: "Morgenmad", icon: morgenmad },
  { slug: "plus", icon: plus },
];

export default function CategoriesPage() {
  useUnlockScroll();
  const navigate = useNavigate();

  // venstre / højre kolonne (forskudt)
  const left = CATEGORIES.filter((_, i) => i % 2 === 0);
  const right = CATEGORIES.filter((_, i) => i % 2 === 1);

  // gå til simpel kategori-resultatside (direkte på ét tag)
  const goTo = (slug) => {
    navigate(`/categories/result?cat=${encodeURIComponent(slug)}`);
  };

  // filter sheet state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // globale filtre (kan bruges hvis du vil vise "aktive filtre" i UI senere)
  const [filters, setFilters] = useState({
    sort: null, // <-- var "recent", nu null så ingen er valgt fra start
    time: null, // "<30" | "60-90" | ">90" | null
    tags: [], // ["Pasta","Vegetar",...]
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
