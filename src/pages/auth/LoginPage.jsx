import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./LoginPage.module.css";

import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const savedEmail = localStorage.getItem("profile.email");
    const savedPw = localStorage.getItem("profile.password");

    if (email === savedEmail && pw === savedPw) {
      localStorage.setItem("auth.loggedIn", "true");
      navigate("/");
    } else {
      alert("Forkert mail eller adgangskode");
    }
  }

  return (
    <div className={styles.screen}>
      {/* top header section */}
      <header className={styles.top}>
        <button
          className={`bubbleButton bubbleRed bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        <div className={styles.headlineWrap}>
          <div className={styles.appTitle}>MIN KOGEBOG</div>
          <div className={styles.subline}>Log in</div>
        </div>
      </header>

      {/* coral form card */}
      <main className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <span className={styles.labelText}>Mail</span>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}>Adgangskode</span>
            <input
              className={styles.input}
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
            />
          </label>

          <button
            type="button"
            className={styles.forgot}
            onClick={() => alert("kom senere 🙂")}
          >
            GLEMT ADGANGSKODE?
          </button>

          <div className={styles.btnRow}>
            <button type="submit" className={styles.ctaBtn}>
              Log In
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
