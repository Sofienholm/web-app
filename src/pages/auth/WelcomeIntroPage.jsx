import React from "react";
import { useNavigate } from "react-router";
import styles from "./WelcomeIntroPage.module.css";

import chefStack from "../../../public/assets/home/ill-home-food-man-on-books-pink.svg";

export default function WelcomeIntroPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        {/* Illustration */}
        <img
          src={chefStack}
          alt=""
          className={styles.illustration}
        />

        {/* Log in knap */}
        <button
          className={styles.primaryBtn}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>

        {/* Ny her? */}
        <div className={styles.signupTeaser}>
          <div className={styles.teaserQuestion}>NY HER?</div>
          <button
            className={styles.signupLink}
            onClick={() => navigate("/signup")}
          >
            OPRET PROFIL
          </button>
        </div>
      </div>
    </div>
  );
}
