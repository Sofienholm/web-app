// -- IMPORTS --
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CategoriesPage.module.css";
import FilterSheet from "./FilterSheet.jsx";
import useUnlockScroll from "../../hooks/useUnlockScroll";

// -- ASSET IMPORTS --
import filterIcon from "/assets/icon/ic-filter-symbol.svg";
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

// -- CONSTANTS: CATEGORIES --
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

// -- COMPONENT: CategoriesPage --
export default function CategoriesPage() {
  useUnlockScroll(); // lås evt. body-scroll op når siden vises

  const navigate = useNavigate();

  // -- DERIVED DATA: venstre / højre kolonne (forskudt)
  const left = CATEGORIES.filter((_, i) => i % 2 === 0);
  const right = CATEGORIES.filter((_, i) => i % 2 === 1);

  // -- NAVIGATION: gå til simpel kategori-resultatside
  const goTo = (slug) => {
    // hent slug og gå til resultatsiden via query param
    navigate(`/categories/result?cat=${encodeURIComponent(slug)}`);
  };

  // -- STATE: filter sheet åben/lukket --
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // -- STATE: globale filtre (til evt. visning af aktive filtre senere) --
  const [filters, setFilters] = useState({
    sort: null, // var "recent" – nu null så ingen valgt fra start
    time: null, // "<30" | "60-90" | ">90" | null
    tags: [], // fx ["Pasta","Vegetar"]
  });

  // -- HANDLER: kaldt når man trykker "TILFØJ" i sheet'et --
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

    // navigér til filtreret liste med valgte kriterier
    navigate(`/categories/filter?${params.toString()}`);
  }

  // -- RENDER --
  return (
    <div className={styles.page}>
      {/* -- FILTER-KNAP (øverst højre) -- */}
      <button
        type="button"
        className={styles.filterBtn}
        aria-label="Filtrér"
        onClick={() => setIsFilterOpen(true)} // åbn sheet
      >
        <img
          src={filterIcon}
          alt=""
          className={styles.filterIcon}
          aria-hidden="true"
        />
      </button>

      {/* -- GRID: forskudt to-kolonne layout -- */}
      <div className={styles.columns}>
        <div className={styles.col}>
          {left.map((cat) => (
            <button
              key={cat.slug}
              className={styles.card}
              onClick={() => goTo(cat.slug)} // gå til kategori
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
              onClick={() => goTo(cat.slug)} // gå til kategori
            >
              <img src={cat.icon} alt="" className={styles.cardImg} />
            </button>
          ))}
        </div>
      </div>

      {/* -- FILTER OVERLAY SHEET -- */}
      {isFilterOpen && (
        <FilterSheet
          initialFilters={filters} // giv nuværende filtre videre til sheet
          onClose={() => setIsFilterOpen(false)} // luk uden at anvende
          onApply={applyFilters} // anvend valgte filtre
        />
      )}
    </div>
  );
}
