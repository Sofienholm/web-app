// billede + titel + beskrivelse + tid + portioner + tags
import { useRef } from "react";
import cameraIcon from "/assets/icon/illu-camera-green.svg"; // Vite: brug /assets/...
 import styles from "../CreatePage.module.css";

 const ALL_TAGS = [
   "Budget",
   "Hurtigt & nemt",
   "Vegetar",
   "Asiatisk",
   "Pasta",
   "Mexicansk",
 ];

 export default function BasicsSection({
   image,
   setImage,
   title,
   setTitle,
   description,
   setDescription,
   timeMin,
   setTimeMin,
   servings,
   setServings,
   tags,
   setTags,
 }) {
   const fileRef = useRef(null);

   function pickFile() {
     fileRef.current?.click();
   }
   function onFileChange(e) {
     const f = e.target.files?.[0];
     if (!f) return;
     const r = new FileReader();
     r.onload = () => setImage(r.result);
     r.readAsDataURL(f);
   }
   function toggleTag(tag) {
     setTags(
       tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
     );
   }

   return (
     <section>
       {/* billede */}
       <div className={styles.imageBox} onClick={pickFile} role="button">
         {image ? (
           <img className={styles.image} src={image} alt="" />
         ) : (
           <img className={styles.camera} src={cameraIcon} alt="Vælg billede" />
         )}
       </div>
       <input
         ref={fileRef}
         type="file"
         accept="image/*"
         className={styles.hidden}
         onChange={onFileChange}
       />

       {/* felter */}
       <label className={styles.label}>
         
         <input
           className={styles.input}
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           placeholder="Titel"
         />
       </label>

       <label className={styles.label}>
       
         <textarea
           className={styles.textarea}
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           placeholder="Kort beskrivelse..."
         />
       </label>

       <div className={styles.row}>
         <label className={`${styles.label} ${styles.col}`}>
         
           <input
             className={styles.number}
             placeholder="Tid"
             type="number"
             value={timeMin}
             onChange={(e) => setTimeMin(e.target.value)}
           />
         </label>
         <label className={`${styles.label} ${styles.col}`}>
          
           <input
             className={styles.number}
             type="number"
             value={servings}
             onChange={(e) => setServings(e.target.value)}
                placeholder="Portioner"
           />
         </label>
       </div>

       {/* tags */}
       <div className={styles.tags}>
         {ALL_TAGS.map((tag) => (
           <button
             key={tag}
             type="button"
             onClick={() => toggleTag(tag)}
             className={`${styles.chip} ${
               tags.includes(tag) ? styles.chipActive : ""
             }`}
           >
             {tag}
           </button>
         ))}
       </div>
     </section>
   );
 }
