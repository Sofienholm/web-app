import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SignupPage.module.css";
import { signupUser } from "../../services/auth.local.js";

import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwAgain, setPwAgain] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // simpelt tjek
    if (pw.trim() !== pwAgain.trim()) {
      alert("Adgangskoderne er ikke ens 🙈");
      return;
    }

    // gem midlertidigt i localStorage (ligesom vi gjorde tidligere)
    signupUser({
      name: name.trim(),
      email: email.trim(),
      password: pw.trim(),
    });

    // videre til avatar-step
    navigate("/signup/avatar");
  }

  return (
    <main className={styles.screen}>
      <div className={styles.shell}>
        {/* top row: tilbage + tekstblok */}
        <div className={styles.topRow}>
          <button
            type="button"
            className={`bubbleButton bubbleRed bubbleLeft ${styles.backBubble}`}
            onClick={() => navigate(-1)}
            aria-label="Tilbage"
          >
            <img src={backIcon} alt="" className="bubbleIcon" />
          </button>

          <div className={styles.headBlock}>
            <h1 className={styles.appTitle}>MIN KOGEBOG</h1>
            <div className={styles.subline}>Opret en personlig profil</div>
          </div>
        </div>

        {/* det røde kort m. baggrundsgrafik */}
        <section className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Navn */}
            <label className={styles.label}>
              <span className={styles.labelText}>Navn</span>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            {/* Mail */}
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

            {/* Kode */}
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

            {/* Kode igen */}
            <label className={styles.label}>
              <span className={styles.labelText}>Adgangskode igen</span>
              <input
                className={styles.input}
                type="password"
                value={pwAgain}
                onChange={(e) => setPwAgain(e.target.value)}
                required
              />
            </label>

            <div className={styles.btnRow}>
              <button type="submit" className={styles.ctaBtn}>
                VIDERE
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
