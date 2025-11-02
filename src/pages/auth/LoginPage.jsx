// src/pages/auth/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import styles from "./LoginPage.module.css";
import backIcon from "../../../public/assets/icon/ic-back-symbol.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();

    try {
      // hvis der kører en anonym session, så luk den ned først
      if (auth.currentUser?.isAnonymous) {
        await signOut(auth);
        console.log("🔸 anonym bruger logget ud");
      }

      // log ind med email + password
      const res = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        pw.trim()
      );
      console.log("✅ Login success:", res.user);

      // success -> videre
      navigate("/home", { replace: true });
      console.log("➡️ navigating to /home");
      setTimeout(() => navigate("/home", { replace: true }), 1500);
    } catch (error) {
      console.error("Fejl ved login:", error.code, error.message);
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          alert("Forkert email eller adgangskode.");
          break;
        case "auth/user-not-found":
          alert("Ingen bruger med denne email.");
          break;
        case "auth/too-many-requests":
          alert("For mange forsøg. Prøv igen om lidt.");
          break;
        case "auth/network-request-failed":
          alert("Netværksfejl. Tjek din forbindelse.");
          break;
        default:
          alert(`Login fejlede: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.screen}>
      {/* bund-baggrundsfarve */}
      <div className={styles.bottomFill} />

      <div className={styles.shell}>
        <button
          type="button"
          className={`bubbleButton bubbleRed bubbleLeft ${styles.backBubble}`}
          onClick={() => navigate(-1)}
          aria-label="Tilbage"
        >
          <img src={backIcon} alt="" className="bubbleIcon" />
        </button>

        <header className={styles.headBlock}>
          <h1 className={styles.appTitle}>MIN KOGEBOG</h1>
          <div className={styles.subline}>Log ind på din profil</div>
        </header>

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
              <button
                type="submit"
                className={styles.ctaBtn}
                disabled={loading}
              >
                {loading ? "Logger ind..." : "LOG IN"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
