// src/components/recipe/RecipeForm.jsx
import { useState } from "react";
import BasicsFields from "./BasicsFields.jsx";
import ChipGroup from "./ChipGroup.jsx";
import EditableList from "./EditableList.jsx";
import FormActions from "./FormActions.jsx";
import Sheet from ".//Sheet.jsx";
import styles from "../CreatePage.module.css";

export default function RecipeForm({ onSave }) {
  // 🔹 State til opskriftens felter
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeMin, setTimeMin] = useState("");
  const [servings, setServings] = useState("");
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);

  // 🔹 Visningstilstande
  const [showSteps, setShowSteps] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  // 🔹 Gem opskrift
  function handleSubmit(e) {
    e.preventDefault();
    const recipeData = {
      title,
      description,
      timeMin,
      servings,
      steps,
      ingredients,
      tags,
      image,
    };
    onSave(recipeData);
  }

  return (
    <form className={styles.recipeForm} onSubmit={handleSubmit}>
      {/* Grundfelter */}
      <BasicsFields
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        timeMin={timeMin}
        setTimeMin={setTimeMin}
        servings={servings}
        setServings={setServings}
        image={image}
        setImage={setImage}
      />

      {/* Fremgangsmåde */}
      <section className={styles.stepsSection}>
        <h3>Fremgangsmåde</h3>
        {!showSteps ? (
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setShowSteps(true)}
          >
            +
          </button>
        ) : (
          <EditableList
            items={steps}
            setItems={setSteps}
            mode="steps"
            onClose={() => setShowSteps(false)}
          />
        )}
      </section>

      {/* Ingredienser */}
      <section className={styles.ingredientsSection}>
        <h3>Ingredienser</h3>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowIngredients(true)}
        >
          +
        </button>
      </section>

      {/* Tags */}
      <ChipGroup selected={tags} setSelected={setTags} />

      {/* Gem-knap */}
      <FormActions />

      {/* Ingredienser i fuldskærm */}
      {showIngredients && (
        <Sheet title="Ingredienser" onClose={() => setShowIngredients(false)}>
          <EditableList
            items={ingredients}
            setItems={setIngredients}
            mode="ingredients"
          />
        </Sheet>
      )}
    </form>
  );
}
