// Simple, robust auto-fit hook der skalerer font-size ned,
// indtil teksten kan være i containerens bredde (eller når min nås).
import { useEffect } from "react";

export default function useAutoFitText(
  ref,
  deps = [],
  {
    max = 1.8, // i rem
    min = 1.0, // i rem
    step = 0.05, // i rem
    unit = "rem",
    pad = 0, // ekstra “luft” i px
  } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // start fra max-størrelse
    let size = max;

    // nulstil for at måle korrekt
    el.style.fontSize = `${size}${unit}`;
    el.style.whiteSpace = "nowrap"; // vi fitter på én linje — justér hvis du vil wrappe

    const fits = () => {
      const { scrollWidth, clientWidth } = el;
      return scrollWidth + pad <= clientWidth;
    };

    // Hvis den ikke passer: skru gradvist ned
    while (!fits() && size > min) {
      size = parseFloat((size - step).toFixed(2));
      el.style.fontSize = `${size}${unit}`;
    }

    // Hvis der er masser af plads, kan vi forsøge at gå op (maks. til max)
    while (fits() && size + step <= max) {
      const test = parseFloat((size + step).toFixed(2));
      el.style.fontSize = `${test}${unit}`;
      if (!fits()) {
        // gå tilbage et trin hvis vi ramte forbi
        el.style.fontSize = `${size}${unit}`;
        break;
      }
      size = test;
    }

    // ryd op: lad font-size stå — vi vil gerne beholde beregningen
    // Hvis du vil nulstille: return () => { el.style.fontSize = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
