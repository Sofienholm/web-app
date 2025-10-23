// src/pages/Create/components/RecipeForm.jsx
import { useState } from "react";
import BasicsFields from "./BasicsFields.jsx";
import FormActions from "./FormActions.jsx";
import styles from "./RecipeForm.module.css";

export default function RecipeForm({ onSave }) {
  // Minimal state – kun det I bruger nu
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeMin, setTimeMin] = useState("");
  const [servings, setServings] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      title,
      description,
      timeMin,
      servings,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <BasicsFields
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        timeMin={timeMin}
        setTimeMin={setTimeMin}
        servings={servings}
        setServings={setServings}
        // image fjernet for nu – tilføjes senere når I er klar
      />

      {/* Kun “Afslut” som submit */}
      <FormActions />
    </form>
  );
}
