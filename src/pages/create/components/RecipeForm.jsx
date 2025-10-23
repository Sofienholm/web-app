import { useState } from "react";
import BasicsFields from "./BasicsFields.jsx";
import ChipGroup from "./ChipGroup.jsx";
import EditableList from "./EditableList.jsx";
import FormActions from "./FormActions.jsx";
import styles from "./RecipeForm.module.css";
import Sheet from "./Sheet.jsx";

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
    <form className="recipe-form" onSubmit={handleSubmit}>
      {/* FELTER */}
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

      {/* FREMGANGSMÅDE */}
      <section className="steps-section">
        <h3>Fremgangsmåde</h3>
        {!showSteps ? (
          <button
            type="button"
            className="add-btn"
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

      {/* INGREDIENSER */}
      <section className="ingredients-section">
        <h3>Ingredienser</h3>
        <button
          type="button"
          className="add-btn"
          onClick={() => setShowIngredients(true)}
        >
          +
        </button>
      </section>

      {/* TAGS */}
      <ChipGroup selected={tags} setSelected={setTags} />

      {/* GEM-KNAP */}
      <FormActions />

      {/* INGREDIENSER - FULDSKÆRM */}
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
