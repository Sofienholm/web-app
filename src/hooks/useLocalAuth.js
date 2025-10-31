// src/hooks/useLocalAuth.js
import { useEffect, useState } from "react";

const PROFILE_KEY = "profile";
const LOGGED_IN_KEY = "auth.loggedIn";

export default function useLocalAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function read() {
    try {
      const loggedIn = localStorage.getItem(LOGGED_IN_KEY) === "true";
      if (!loggedIn) return null;
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    setUser(read());
    setLoading(false);

    function onStorage(e) {
      if (e.key === PROFILE_KEY || e.key === LOGGED_IN_KEY) {
        setUser(read());
      }
    }
    function onLocalAuthChange() {
      setUser(read());
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("local-auth-changed", onLocalAuthChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("local-auth-changed", onLocalAuthChange);
    };
  }, []);

  return { user, loading };
}

// valgfri named export (hvis du har enkelte imports med krøllede)
export { useLocalAuth as defaultUseLocalAuth };
