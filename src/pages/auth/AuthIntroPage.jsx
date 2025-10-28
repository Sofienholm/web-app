// src/pages/auth/AuthIntroPage.jsx
import React from "react";
import { useNavigate } from "react-router";
import styles from "./AuthIntroPage.module.css";

// illustrationen med kok på bogstak
import heroCook from "../../../public/assets/home/ill-home-food-man-on-books-pink.svg";

export default function AuthIntroPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.illustrationWrap}>
        <img
          src={heroCook}
          alt="Kok på kogebøger"
          className={styles.illustration}
        />
      </div>

      <button
        className={styles.primaryBtn}
        onClick={() => navigate("/auth/login")}
      >
        Log In
      </button>

      <div className={styles.signupBlock}>
        <div className={styles.newHere}>NY HER?</div>
        <button
          className={styles.signupLink}
          onClick={() => navigate("/auth/signup")}
        >
          OPRET PROFIL
        </button>
      </div>
    </div>
  );
}
