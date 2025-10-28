import { useParams, useNavigate } from "react-router";
import { useRecipe } from "../../hooks/useRecipe";
import styles from "./RecipeDetailPage.module.css";
import editIcon from "/assets/icon/ic-edit-symbol.svg";
import backIcon from "/assets/icon/ic-back-symbol.svg";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = useRecipe(id);
  const navigate = useNavigate();

  if (!recipe) return <p>Indlæser...</p>;

  return (
    <section className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <img src={backIcon} alt="Tilbage" />
      </button>

      <img src={recipe.image} alt={recipe.title} className={styles.image} />
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div className={styles.meta}>
        <p>{recipe.timeMin}</p>
        <p>{recipe.servings} pers.</p>
      </div>

      <div className={styles.tags}>
        {recipe.tags?.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <h2>Ingredienser</h2>
      <ul>
        {recipe.ingredients?.map((ing, i) => (
          <li key={i}>
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>

      <h2>Fremgangsmåde</h2>
      <ol>
        {recipe.steps?.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <button
        className={styles.editBtn}
        onClick={() => navigate(`/edit/${recipe.id}`)}
      >
        <img src={editIcon} alt="Rediger" />
      </button>
    </section>
  );
}
