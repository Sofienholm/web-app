import React from "react";
import styles from "../ProfilePage.module.css";

export default function ProfileInfo({ name, email, illustrationSrc }) {
  return (
    <section className={styles.infoSection}>
      <div className={styles.illustrationCard}>
        <img
          src={illustrationSrc}
          alt="Profil illustration"
          className={styles.illustrationImg}
        />
      </div>
      <div className={styles.userText}>
        <h1 className={styles.userName}>{name}</h1>
        <p className={styles.userEmail}>{email}</p>
      </div>
    </section>
  );
}
