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

  function handleSubmit(e) {
    e.preventDefault();

    // gemmer grunddata i localStorage (uden avatar)
    signupUser({
      name: name.trim(),
      email: email.trim(),
      password: pw.trim(),
    });

    // efter navn+email går vi til avatar-step
    navigate("/signup/avatar");
  }

  return (
    <main className={styles.page}>
      {/* Tilbage-knap */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButton}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      {/* Titel */}
      <h1 className={styles.title}>Lav din profil</h1>
      <p className={styles.sub}>
        Så kan vi kalde dig ved navn ✌︎
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Navn */}
        <label className={styles.label}>
          <span className={styles.labelText}>Navn</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Skriv dit navn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/* Email */}
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

        {/* Password */}
        <label className={styles.label}>
          <span className={styles.labelText}>Adgangskode</span>
          <input
            className={styles.input}
            type="password"
            placeholder="Vælg en kode"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </label>

        {/* Gem knap */}
        <div className={styles.submitRow}>
          <button type="submit" className={styles.submitBtn}>
            Fortsæt
          </button>
        </div>
      </form>
    </main>
  );
}
