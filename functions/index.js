const functions = require("firebase-functions");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// 🔹 Brug Spoonacular API i stedet for cheerio-scraping
exports.importRecipeFromUrl = functions.https.onRequest(async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "Missing ?url parameter" });
  }

  try {
    const apiKey = "d6f370668e974dccb4909052b7285c05";
    const apiUrl = `https://api.spoonacular.com/recipes/extract?apiKey=${apiKey}&url=${encodeURIComponent(
      url
    )}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "failure") {
      return res.status(400).json({ error: data.message });
    }

    // Strukturér data, så det passer til din app
    const recipe = {
      title: data.title || "Uden titel",
      image: data.image || "",
      description: data.summary?.replace(/<[^>]+>/g, "") || "",
      timeMin: data.readyInMinutes || "",
      servings: data.servings || "",
      ingredients: (data.extendedIngredients || []).map((i) => ({
        amount: i.amount || "",
        unit: i.unit || "",
        name: i.original || "",
      })),
      steps: data.analyzedInstructions?.[0]?.steps.map((s) => s.step) || [],
      tags: data.dishTypes || [],
    };

    return res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
