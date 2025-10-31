// src/pages/auth/OnlyGuests.jsx
import { Navigate } from "react-router";
import useLocalAuth from "../../hooks/useLocalAuth";

export default function OnlyGuests({ children }) {
  const { user, loading } = useLocalAuth?.() ?? { user: null, loading: false };
  if (loading) return null;
  const isAuthed = !!user;
  return isAuthed ? <Navigate to="/home" replace /> : children;
}
