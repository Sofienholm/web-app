import React from "react";
import { useNavigate } from "react-router";
import styles from "./WelcomeIntroPage.module.css";

// den illustration du viste (personen på bøgerne)
// du bruger allerede den i andre steder, så vi genbruger den
import heroIllu from "../../../public/assets/home/ill-home-food-man-on-books-pink.svg";

export default function WelcomeIntroPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.screen}>
      {/* Illustration */}
      <img src={heroIllu} alt="" className={styles.illustration} />

      {/* Primær CTA: Log In */}
      <button
        className={styles.loginBtn}
        onClick={() => navigate("/login")}
      >
        Log In
      </button>

      {/* Signup teaser */}
      <div className={styles.signupBlock}>
        <div className={styles.question}>NY HER?</div>
        <button
          className={styles.signupLink}
          onClick={() => navigate("/signup")}
        >
          OPRET PROFIL
        </button>
      </div>
    </main>
  );
}
