import { useNavigate } from "react-router";
import RecipeForm from "./components/RecipeForm.jsx";
import styles from "./CreatePage.module.css";
import backIcon from "/assets/icon/ic-back-symbol.svg";
import Flueben from "/assets/icon/ic-flueben-symbol.svg";
import { createRecipe } from "../../services/recipes.firestore.js";
import { auth } from "../../app/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";

export default function CreatePage() {
  const navigate = useNavigate();

  async function handleSave(data) {
    const user = auth.currentUser;

    if (!user) {
      alert("Du skal være logget ind for at gemme opskrifter.");
      return;
    }

    try {
      let imageUrl = "";
      // 🔹 Hvis brugeren har valgt et billede (base64), upload det til Storage
      if (data.image && data.image.startsWith("data:image")) {
        const blob = await (await fetch(data.image)).blob();
        const imageRef = ref(storage, `recipes/${user.uid}/${Date.now()}.jpg`);

        // 📸 Tjek størrelse før upload
        if (blob.size > 5 * 1024 * 1024) {
          alert("Billedet er for stort (maks 5 MB). Vælg et mindre billede.");
          return;
        }

        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
        console.log("✅ Billede uploadet:", imageUrl);
      }

      // 🔹 Gem opskriften i Firestore
      const { id } = await createRecipe({
        ...data,
        image: imageUrl || "", // brug Storage-linket i stedet
        ownerId: user.uid,
      });

      console.log("✅ Opskrift oprettet med id:", id);
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error("❌ Fejl ved oprettelse af opskrift:", err);
      alert("Der opstod en fejl ved gemning af opskriften.");
    }
  }
  return (
    <section>
      <div className={styles.topButtons}>
        <button
          type="button"
          className={`bubbleButton bubbleGreen bubbleLeft ${styles.backButtonFixed}`}
          onClick={() => navigate("/home")}
        >
          <img src={backIcon} alt="Tilbage" className="bubbleIcon" />
        </button>

        <button
          type="submit"
          className={`bubbleButton bubbleGreen bubbleRight ${styles.addButtonFixed}`}
          onClick={() => document.querySelector("form")?.requestSubmit()}
        >
          <img src={Flueben} alt="Gem" className="bubbleIcon" />
        </button>
      </div>

      {/* RecipeForm kalder onSave, som nu håndterer Firestore */}
      <RecipeForm onSave={handleSave} />
    </section>
  );
}
