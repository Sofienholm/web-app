import styles from "./HomePage.module.css";
import { useLocalAuth } from "../../hooks/useLocalAuth.js";

// Illustrationer
import manBooks from "../../../public/assets/home/ill-home-food-man-on-books-pink.svg";
import cake from "../../../public/assets/home/ill-home-food-cake-pink.svg";
import noodles from "../../../public/assets/home/ill-home-food-nudles-pink.svg";
import pasta from "../../../public/assets/home/ill-home-food-pasta-pink.svg";
import meat from "../../../public/assets/home/ill-home-food-meat-pink.svg";
import veggie from "../../../public/assets/home/ill-home-food-veggie-pink.svg";

export default function HomePage() {
  const user = useLocalAuth();

  const firstName =
    user?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "ven";

  return (
    <section className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Velkommen {firstName}</h1>
        <p className={styles.subtitle}>Hvad er der på menuen?</p>
      </div>

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
