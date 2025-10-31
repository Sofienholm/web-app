// src/hooks/useAuthUser.js
import useAuth from "./useAuth";

/** Returnerer Firebase-brugeren (eller null) */
export default function useAuthUser() {
  const { user } = useAuth();
  return user;
}
