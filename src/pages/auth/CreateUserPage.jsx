import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CreateUserPage.module.css";

// vi genbruger dine bubble knapper til "tilbage"
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // lille user object vi smider i localStorage
    const userObj = {
      id: "demo-user",           // indtil vi har rigtig auth
      displayName: displayName,  // bruges på forsiden ("Velkommen ____")
      email: email || "",        // kan være tom
    };

    localStorage.setItem("app.user", JSON.stringify(userObj));

    // send brugeren til forsiden (home)
    navigate("/");
  }

  return (
    <main className={styles.page}>
      {/* tilbage-knap ude i venstre kant */}
      <button
        type="button"
        className={`bubbleButton bubbleRed bubbleLeft ${styles.backButtonPos}`}
        onClick={() => navigate(-1)}
        aria-label="Tilbage"
      >
        <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
      </button>

      {/* intro */}
      <header className={styles.headerBlock}>
        <h1 className={styles.title}>Velkommen 🌶</h1>
        <p className={styles.subtitle}>
          Lad os sætte dit køkken op.
        </p>
      </header>

      {/* form */}
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

        <button
          type="submit"
          className={styles.ctaBtn}
        >
          Gem og fortsæt
        </button>
      </form>
    </main>
  );
}
