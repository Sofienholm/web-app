// src/hooks/useAuth.js
import { useEffect, useMemo, useState } from "react";
import { subscribeAuth, logout } from "../hooks/auth.firebase.js";
import { getUserProfile } from "../hooks/users.firestore.js";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return subscribeAuth(async (fbUser) => {
      setUser(fbUser || null);
      if (fbUser) {
        const p = await getUserProfile(fbUser.uid);
        setProfile(p || null);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  return useMemo(
    () => ({ user, profile, isAuthed: !!user?.uid, loading, logout }),
    [user, profile, loading]
  );
}
