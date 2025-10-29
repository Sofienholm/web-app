const functions = require("firebase-functions");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

// HTTP trigger: /importRecipeFromUrl?url=https://...
exports.importRecipeFromUrl = functions.https.onRequest(async (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).send({ error: "Missing ?url parameter" });
    return;
  }

  try {
    const html = await fetch(url).then((r) => r.text());
    const $ = cheerio.load(html);

    const title = $("h1").first().text().trim();
    const image = $("img").first().attr("src") || "";
    const ingredients = $("li")
      .filter(
        (i, el) =>
          $(el).text().toLowerCase().includes("g") ||
          $(el).text().includes("dl")
      )
      .map((i, el) => $(el).text().trim())
      .get();
    const steps = $("ol li, ul li")
      .map((i, el) => $(el).text().trim())
      .get();

    res.set("Access-Control-Allow-Origin", "*");
    res.json({ title, image, ingredients, steps });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});
