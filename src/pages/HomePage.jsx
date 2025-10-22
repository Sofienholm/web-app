import styles from "./HomePage.module.css";
import { useAuthUser } from "../hooks/useAuthUser";

// Illustrationer (import fra public/assets/home)
import manBooks from "../../public/assets/home/ill-home-food-man-on-books-pink.svg";
import cake from "../../public/assets/home/ill-home-food-cake-pink.svg";
import noodles from "../../public/assets/home/ill-home-food-nudles-pink.svg";
import pasta from "../../public/assets/home/ill-home-food-pasta-pink.svg";
import meat from "../../public/assets/home/ill-home-food-meat-pink.svg";
import veggie from "../../public/assets/home/ill-home-food-veggie-pink.svg";

export default function HomePage() {
  const user = useAuthUser(); // henter nuværende bruger (fra AuthProvider)

  return (
    <section className={styles.home}>
      {/* Hero tekst */}
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Velkommen{" "}
          {user ? user.displayName || user.email.split("@")[0] : "gæst"}
        </h1>
        <p className={styles.subtitle}>Hvad er der på menuen?</p>
      </div>

      {/* Illustrationer */}
      <div className={styles.illustrations}>
        <img src={manBooks} alt="Mand på bøger" className={styles.center} />
        <img src={cake} alt="Kage" className={`${styles.img} ${styles.cake}`} />
        <img
          src={noodles}
          alt="Nudler"
          className={`${styles.img} ${styles.noodles}`}
        />
        <img
          src={pasta}
          alt="Pasta"
          className={`${styles.img} ${styles.pasta}`}
        />
        <img src={meat} alt="Kød" className={`${styles.img} ${styles.meat}`} />
        <img
          src={veggie}
          alt="Grøntsager"
          className={`${styles.img} ${styles.veggie}`}
        />
      </div>
    </section>
  );
}
