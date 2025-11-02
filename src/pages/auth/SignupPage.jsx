// src/pages/auth/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../app/firebase";
import styles from "./SignupPage.module.css";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwAgain, setPwAgain] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (pw.trim() !== pwAgain.trim()) {
      alert("Adgangskoderne er ikke ens 🙈");
      return;
    }

    setLoading(true);
try {
  const auth = getAuth();

  // 1️⃣ Opret bruger i Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), pw.trim());
  const user = userCredential.user;

  // 2️⃣ (Sikrer korrekt auth-context før updateProfile)
  await auth.updateCurrentUser(user);
  await updateProfile(auth.currentUser, { displayName: name.trim() });

  // 3️⃣ Gem ekstra data i Firestore
  await setDoc(
    doc(db, "users", user.uid),
    {
      displayName: name.trim(),
      email: email.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  navigate("/signup/avatar");
} catch (error) {
  console.error("Fejl ved oprettelse:", error.code, error.message);
  alert(`Der opstod en fejl under oprettelsen:\n${error.message}`);

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.screen}>
      <div className={styles.shell}>
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

        <section className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className={styles.ctaBtn}
                disabled={loading}
              >
                {loading ? "Opretter..." : "VIDERE"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
