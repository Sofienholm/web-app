import { Navigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider.jsx";

export default function OnlyGuests({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/home" replace />;
  return children;
}
