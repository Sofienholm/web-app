import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../providers/AuthProvider.jsx";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // evt. lille spinner
  if (!user) return <Navigate to="/login" replace />;

  // Understøt både wrapper-pattern og nested routes
  return children ?? <Outlet />;
}
