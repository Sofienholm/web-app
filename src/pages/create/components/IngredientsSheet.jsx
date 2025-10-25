import { useState } from "react";
import styles from "../CreatePage.module.css";

const UNITS = ["kg","g","ml"];

export default function IngredientsSheet({ open, onClose, ingredients, setIngredients }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState(UNITS[1]); // g

  function add(){
    if(!name.trim()) return;
    setIngredients([...ingredients, { amount, unit, name: name.trim() }]);
    setName(""); setAmount(""); setUnit(UNITS[1]);
  }
  function remove(i){ setIngredients(ingredients.filter((_,idx)=>idx!==i)); }

  if(!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e)=>e.stopPropagation()}>
        <div className={styles.sheetHead}>
          <h3>Ingredienser</h3>
          <button type="button" className={styles.ghost} onClick={onClose}>✕</button>
        </div>

        <ul className={styles.ingList}>
          {ingredients.map((it, i)=>(
            <li key={i} className={styles.ingRow}>
              <span>{it.amount} {it.unit} {it.name}</span>
              <button type="button" className={styles.ghost} onClick={()=>remove(i)}>🗑</button>
            </li>
          ))}
        </ul>

        <div className={styles.ingForm}>
          <input className={styles.input} type="number" placeholder="mængde" value={amount} onChange={e=>setAmount(e.target.value)} />
          <select className={styles.select} value={unit} onChange={e=>setUnit(e.target.value)}>
            {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <input className={styles.input} placeholder="navn (fx Hvedemel)" value={name} onChange={e=>setName(e.target.value)} />
          <button type="button" className={styles.primary} onClick={add}>+</button>
        </div>
      </div>
    </div>
  );
}
