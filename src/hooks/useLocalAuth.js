// src/hooks/useLocalAuth.js
import { useEffect, useState } from "react";

function useLocalAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function read() {
    try {
      const raw = localStorage.getItem("profile");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    setUser(read());
    setLoading(false);

    function onStorage(e) {
      if (e.key === "profile") {
        setUser(read());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { user, loading };
}

export default useLocalAuth; // default export
export { useLocalAuth }; // named export også
