import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./CreateUserPage.module.css";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  // --- mobil keyboard / viewport fix ---
  useEffect(() => {
    function updateVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    updateVH();
    window.addEventListener("resize", updateVH);
    window.addEventListener("orientationchange", updateVH);
    return () => {
      window.removeEventListener("resize", updateVH);
      window.removeEventListener("orientationchange", updateVH);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const userObj = {
      id: "demo-user",
      displayName,
      email: email || "",
    };
    localStorage.setItem("app.user", JSON.stringify(userObj));
    navigate("/");
  }

  return (
    <main className={styles.page}>
      <button
        type="button"
        className={`bubbleButton bubbleRed bubbleLeft ${styles.backButtonPos}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      <header className={styles.headerBlock}>
        <h1 className={styles.title}>Velkommen 🌶</h1>
        <p className={styles.subtitle}>Lad os sætte dit køkken op.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Dit navn
          <input
            className={styles.input}
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="F.eks. Sofie"
            required
          />
        </label>

        <label className={styles.label}>
          Email (valgfri)
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dig@eksempel.dk"
          />
        </label>

        <button type="submit" className={styles.ctaBtn}>
          Gem og fortsæt
        </button>
      </form>
    </main>
  );
}
