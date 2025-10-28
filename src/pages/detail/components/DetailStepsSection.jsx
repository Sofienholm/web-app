import { useEffect, useRef, useState } from "react";
import styles from "../../create/components/Step.module.css";

export default function DetailStepsSection({ steps }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // observer sektionen, når den kommer i view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        if (!entry.isIntersecting) setVisible(false);

      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.detailStepsSection} ${
        visible ? styles.visible : ""
      }`}
    >
      <div className={styles.inner}>
        <h2>FREMGANGSMÅDE</h2>
        <ol>
          {Array.isArray(steps) && steps.length > 0 ? (
            steps.map((step, i) => <li key={i}>{step}</li>)
          ) : (
            <li>Ingen trin tilføjet</li>
          )}
        </ol>
      </div>
    </section>
  );
}
