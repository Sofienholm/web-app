// -- AUTO-FIT HOOK --
// Justerer font-size dynamisk, så tekst passer indenfor elementets bredde.
// Skalerer ned (eller lidt op) indtil teksten ikke “overløber”.

import { useEffect } from "react";

export default function useAutoFitText(
  ref, // reference til tekst-elementet (fx titleRef)
  deps = [], // afhængigheder der trigger genberegning
  {
    max = 1.8, // max font-størrelse i rem
    min = 1.0, // min font-størrelse i rem
    step = 0.05, // hvor meget der ændres per iteration
    unit = "rem", // enhed (typisk rem)
    pad = 0, // ekstra luft i px (valgfri)
  } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // start fra max
    let size = max;

    // nulstil font for korrekt måling
    el.style.fontSize = `${size}${unit}`;
    el.style.whiteSpace = "nowrap"; // vi fitter på én linje (ændr hvis du vil wrappe)

    // helper-funktion: tjek om tekst passer i container
    const fits = () => {
      const { scrollWidth, clientWidth } = el;
      return scrollWidth + pad <= clientWidth;
    };

    // skaler NED til teksten passer
    while (!fits() && size > min) {
      size = parseFloat((size - step).toFixed(2));
      el.style.fontSize = `${size}${unit}`;
    }

    // hvis der er luft, skaler LIDT OP igen (men ikke over max)
    while (fits() && size + step <= max) {
      const test = parseFloat((size + step).toFixed(2));
      el.style.fontSize = `${test}${unit}`;
      if (!fits()) {
        // stop og gå tilbage ét trin
        el.style.fontSize = `${size}${unit}`;
        break;
      }
      size = test;
    }

    // vi beholder beregnet font-size (ingen reset ved unmount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
