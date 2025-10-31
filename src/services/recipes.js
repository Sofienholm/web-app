// src/services/recipes.js
import * as fs from "./recipes.firestore";

// Dine hooks kan importere sådan her:
// import { api as recipes } from "../services/recipes";
export const api = fs;

// (valgfrit) hvis andre steder importerede funktionerne direkte:
export * from "./recipes.firestore";
