import { useState } from "react";
import BasicsSection from "./BasicsSection.jsx";
import StepsSection from "./StepsSection.jsx";
import IngredientsSheet from "./IngredientsSheet.jsx";

export default function RecipeForm({ onSave }) {
  // basics
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeMin, setTimeMin] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([]);

  // steps & ingredients
  const [steps, setSteps] = useState([]); // [{text}]
  const [ingredients, setIngredients] = useState([]); // [{amount, unit, name}]

  // UI toggles
  const [showSteps, setShowSteps] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      image,
      title,
      description,
      timeMin,
      servings,
      tags,
      steps,
      ingredients,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 1) BASICS */}
      <BasicsSection
        image={image}
        setImage={setImage}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        timeMin={timeMin}
        setTimeMin={setTimeMin}
        servings={servings}
        setServings={setServings}
        tags={tags}
        setTags={setTags}
      />

      {/* 2) STEPS (lille kasse, toggles inline) */}
      <StepsSection
        open={showSteps}
        onOpen={() => setShowSteps(true)}
        onClose={() => setShowSteps(false)}
        steps={steps}
        setSteps={setSteps}
      />

      {/* 3) INGREDIENTS (sheet, fullscreen) */}
      <button type="button" onClick={() => setShowIngredients(true)}>
        🧄 Ingredienser
      </button>
      <IngredientsSheet
        open={showIngredients}
        onClose={() => setShowIngredients(false)}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <button type="submit">AFSLUT</button>
    </form>
  );
}
