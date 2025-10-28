import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./LoginPage.module.css";
import { loginUser } from "../../services/auth.local.js";

import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    loginUser({ email, password: pw });
    navigate("/"); // går til HomePage
  }

  return (
    <main className={styles.page}>
      {/* tilbage-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButton}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      <h1 className={styles.title}>Log ind</h1>
      <p className={styles.sub}>Godt at se dig igen 🫶</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelText}>Email</span>
          <input
            className={styles.input}
            type="email"
            placeholder="din@email.dk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Adgangskode</span>
          <input
            className={styles.input}
            type="password"
            placeholder="••••••••"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </label>

        <div className={styles.submitRow}>
          <button type="submit" className={styles.submitBtn}>
            Log ind
          </button>
        </div>
      </form>

      <button
        className={styles.smallLink}
        type="button"
        onClick={() => navigate("/signup")}
      >
        Har du ikke en profil? Opret her
      </button>
    </main>
  );
}
