// -- IMPORTS --
import { useState } from "react";
import BasicsSection from "./BasicsSection.jsx";
import StepsSection from "./StepsSection.jsx";
import IngredientsSheet from "./IngredientsSheet.jsx";
import styles from "../CreatePage.module.css";
import Garlictap from "/assets/icon/ic-ingredient-symbol.svg";
import Add from "/assets/icon/ic-add-symbol.svg";

// -- RECIPE FORM COMPONENT --
// Indeholder hele formularen til oprettelse og redigering af opskrifter
export default function RecipeForm({ onSave, initialData = {} }) {
  // -- STATE: BASIC FIELDS --
  // Håndterer de grundlæggende felter i opskriften
  const [image, setImage] = useState(initialData.image || "");
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [timeMin, setTimeMin] = useState(initialData.timeMin || "");
  const [servings, setServings] = useState(initialData.servings || "");
  const [tags, setTags] = useState(initialData.tags || []);
  const [steps, setSteps] = useState(initialData.steps || []);
  const [ingredients, setIngredients] = useState(
    initialData.ingredients || [{ amount: "", unit: "Enhed", name: "" }]
  );

  // -- STATE: UI TOGGLES --
  // Viser eller skjuler de interaktive sektioner
  const [showSteps, setShowSteps] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  // -- HANDLE SUBMIT --
  // Samler al data fra formularen og sender til parent-komponenten
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

  // -- RENDER OUTPUT --
  return (
    <form onSubmit={handleSubmit}>
      {/* -- BASICS SECTION --
          Indeholder billede, titel, beskrivelse, tid, portioner og tags */}
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

      {/* -- STEPS SECTION --
          Viser eller skjuler trin-for-trin vejledning (inline toggle) */}
      <StepsSection
        open={showSteps}
        onOpen={() => setShowSteps(true)}
        onClose={() => setShowSteps(false)}
        steps={steps}
        setSteps={setSteps}
      />

      {/* -- INGREDIENTS SECTION --
          Åbner et fullscreen-sheet med ingredienser */}
      <button
        type="button"
        className={`bubbleButton bubbleGreen bubbleRight ${styles.ingredientsButtonPos}`}
        onClick={() => setShowIngredients(true)}
        aria-label="Ingredienser"
      >
        <img src={Garlictap} alt="ingredienser" className="bubbleIcon" />
      </button>

      {/* Ingrediens-sheet (slide-in fra højre) */}
      <IngredientsSheet
        open={showIngredients}
        onClose={() => setShowIngredients(false)}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </form>
  );
}
