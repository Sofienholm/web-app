import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import styles from "./WelcomeIntroPage.module.css";
import splashAnimation from "/public/assets/splash-screen.json";

export default function WelcomeIntroPage() {
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  // hent animationen fra public
  useEffect(() => {
    setAnimationData(splashAnimation);
  }, []);

  // vis knapper efter animation er færdig (5.6 sek)
  useEffect(() => {
    const t = setTimeout(() => setShowButtons(true), 5600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className={styles.screen}>
      {/* Splash animation */}
      <div className={styles.splashContainer}>
        {animationData && (
          <Lottie
            animationData={splashAnimation}
            loop={false}
            autoplay
            className={styles.splashAnimation}
          />
        )}
      </div>

      {/* CTA’er: vises efter splash */}
      <div
        className={`${styles.ctaBlock} ${showButtons ? styles.ctaVisible : ""}`}
      >
        <button className={styles.loginBtn} onClick={() => navigate("/login")}>
          Log In
        </button>

        <div className={styles.signupBlock}>
          <div className={styles.question}>NY HER?</div>
          <button
            className={styles.signupLink}
            onClick={() => navigate("/signup")}
          >
            OPRET PROFIL
          </button>
        </div>
      </div>
    </main>
  );
}
