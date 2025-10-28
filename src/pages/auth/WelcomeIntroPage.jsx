import React from "react";
import { useNavigate } from "react-router";
import styles from "./WelcomeIntroPage.module.css";

import heroIllu from "../../../public/assets/home/ill-home-food-man-on-books-pink.svg"; // brug en eksisterende illustration

export default function WelcomeIntroPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.illuWrap}>
        <img src={heroIllu} alt="" className={styles.illu} />
      </div>

      <h1 className={styles.title}>Velkommen</h1>
      <p className={styles.sub}>
        Gem dine egne opskrifter, find dem hurtigt igen og hold styr på dine
        favoritter ✌︎
      </p>

      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={() => navigate("/signup")}
        >
          Opret profil
        </button>

        <button
          className={styles.secondaryBtn}
          onClick={() => navigate("/login")}
        >
          Log ind
        </button>
      </div>
    </main>
  );
}
