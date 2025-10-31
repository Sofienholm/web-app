// src/pages/auth/RequireAuth.jsx
import { Navigate } from "react-router";
import useLocalAuth from "../../hooks/useLocalAuth";

export default function RequireAuth({ children }) {
  const { user, loading } = useLocalAuth?.() ?? { user: null, loading: false };
  if (loading) return null; // evt. spinner
  const isAuthed = !!user;
  return isAuthed ? children : <Navigate to="/login" replace />;
}
