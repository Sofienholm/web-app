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
    navigate("/");
  }

  return (
    <main className={styles.screen}>
      <div className={styles.shell}>
        {/* tilbage-knap */}
        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        {/* titel */}
        <header className={styles.headBlock}>
          <h1 className={styles.appTitle}>MIN KOGEBOG</h1>
          <div className={styles.subline}>Log in på din profil</div>
        </header>

        {/* røde kort */}
        <section className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              <span className={styles.labelText}>Mail</span>
              <input
                className={styles.input}
                type="email"
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
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </label>

            <button
              type="button"
              className={styles.forgot}
              onClick={() => alert("Kommer senere 🙂")}
            >
              GLEMT ADGANGSKODE?
            </button>

            <div className={styles.btnRow}>
              <button type="submit" className={styles.ctaBtn}>
                LOG IN
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
