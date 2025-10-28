import { useState, useEffect } from "react";

export function useLocalAuth() {
  // helper der læser current bruger-data fra localStorage
  function readUser() {
    const name = localStorage.getItem("profile.name") || "";
    const email = localStorage.getItem("profile.email") || "";
    const avatarSrc = localStorage.getItem("profile.avatarSrc") || "";
    const loggedIn = localStorage.getItem("auth.loggedIn") === "true";

    // hvis der basically ikke er nogen bruger, returnér null
    if (!loggedIn && !name && !email) {
      return null;
    }

    return { name, email, avatarSrc };
  }

  // state der holder den aktuelle bruger
  const [user, setUser] = useState(() => readUser());

  // lyt efter ændringer i localStorage så UI kan opdatere live
  useEffect(() => {
    function handleStorageChange() {
      setUser(readUser());
    }

    // denne event fyrer når localStorage ændres (f.eks. efter signup/login)
    window.addEventListener("storage", handleStorageChange);

    // edge case: hvis vi selv lige har skrevet til localStorage i samme tab,
    // kan vi manuelt kalde handleStorageChange() bagefter login/signup hvis vi vil.
    // (men vi lader det være manuelt for nu)

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return user;
}
