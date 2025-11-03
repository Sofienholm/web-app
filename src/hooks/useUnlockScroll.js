// -- HOOK: useUnlockScroll --
// Midlertidigt tillader vertikal scroll på body, og låser igen ved unmount
import { useEffect } from "react";

export default function useUnlockScroll() {
  useEffect(() => {
    // aktiver lodret scroll, men forhindr vandret bevægelse
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.touchAction = "pan-y"; // tillad kun vertikal swipe
    document.body.style.overscrollBehavior = "none"; // fjern bounce på iOS

    return () => {
      // reset og lås scroll igen når hook unmountes
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    };
  }, []);
}
