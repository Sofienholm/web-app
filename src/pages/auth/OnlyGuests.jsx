import { Navigate, useLocation } from "react-router";
import useLocalAuth from "../../hooks/useLocalAuth";

// Samme default som i auth.local.js
const DEFAULT_AVATAR = "/assets/illustrations/ill-profil-avatar-man-garlic.svg";

export default function OnlyGuests({ children }) {
  const { user, loading } = useLocalAuth?.() ?? { user: null, loading: false };
  const location = useLocation();

  if (loading) return null;

  const isAvatarRoute = location.pathname === "/signup/avatar";

  // Tillad /signup/avatar, hvis brugeren ikke har valgt custom avatar endnu
  if (isAvatarRoute) {
    const hasCustomAvatar =
      !!user?.avatarSrc && user.avatarSrc !== DEFAULT_AVATAR;
    return hasCustomAvatar ? <Navigate to="/home" replace /> : children;
  }

  // Ellers: logged in → væk fra public routes
  return user ? <Navigate to="/home" replace /> : children;
}
