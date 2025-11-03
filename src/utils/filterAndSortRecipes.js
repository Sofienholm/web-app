export default function filterAndSortRecipes(recipes, filters) {
  if (!Array.isArray(recipes)) return [];

  const { sort, time, tags } = filters || {};

  // 1. filtrér på tid
  let out = recipes.filter((r) => {
    const mins = Number(r.timeMinutes);

    if (!time) return true; // ingen tidsfilter
    if (Number.isNaN(mins)) return false; // opskrift uden tid ryger ud når der er tidsfilter

    if (time === ">30")   return mins > 30;
    if (time === "60-90") return mins >= 60 && mins <= 90;
    if (time === ">90")   return mins > 90;

    return true;
  });

  // 2. filtrér på tags
  if (tags && tags.length > 0) {
    const wantedLower = tags.map((t) => t.toLowerCase());

    out = out.filter((recipe) => {
      if (!Array.isArray(recipe.tags)) return false;
      return recipe.tags.some((tag) =>
        wantedLower.includes(String(tag).toLowerCase())
      );
    });
  }

  // 3. sortering
  if (sort === "az") {
    out = [...out].sort((a, b) =>
      (a.title || "").localeCompare(b.title || "", "da", {
        sensitivity: "base",
      })
    );
  } else {
    // default / "recent"
    out = [...out].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
  }

  return out;
}
