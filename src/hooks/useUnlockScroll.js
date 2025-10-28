import { useEffect } from "react";

export default function useUnlockScroll() {
  useEffect(() => {
    // Tillad kun lodret scroll
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.touchAction = "pan-y";
    document.body.style.overscrollBehavior = "none";

    return () => {
      // Lås helt igen
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    };
  }, []);
}
