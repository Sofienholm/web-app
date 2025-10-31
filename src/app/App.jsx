// src/app/App.jsx
import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "../providers/AuthProvider.jsx";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import FullscreenLayout from "./layouts/FullscreenLayout.jsx";

// Pages (Main layout - BESKYTTET)
import HomePage from "../pages/home/HomePage.jsx";
import CategoriesPage from "../pages/categories/CategoriesPage.jsx";
import CategoryResultPage from "../pages/categories/CategoryResultPage.jsx";
import FilteredResultPage from "../pages/categories/FilteredResultPage.jsx";
import SearchPage from "../pages/search/SearchPage.jsx";

// Pages (Fullscreen layout - OFFENTLIG)
import CreatePage from "../pages/create/CreatePage.jsx";
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import ProfileEdit from "../pages/profile/ProfileEdit.jsx";
import WelcomeIntroPage from "../pages/auth/WelcomeIntroPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import SignupPage from "../pages/auth/SignupPage.jsx";
import SignupAvatarPage from "../pages/auth/SignupAvatarPage.jsx";
import RecipeDetailPage from "../pages/detail/RecipeDetailPage.jsx";
import EditRecipePage from "../pages/detail/EditRecipePage.jsx";
import ImportFromUrlPage from "../pages/create/components/ImportFromUrlPage.jsx";
import RecipeDonePage from "../pages/detail/RecipeDonePage.jsx";

// Auth gate
import RequireAuth from "../pages/auth/RequireAuth.jsx";
import OnlyGuests from "../pages/auth/OnlyGuests.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 🔓 Offentlige ruter + startside */}
        <Route element={<FullscreenLayout />}>
<Route path="/" element={<OnlyGuests><WelcomeIntroPage /></OnlyGuests>} />
<Route path="/login" element={<OnlyGuests><LoginPage /></OnlyGuests>} />
<Route path="/signup" element={<OnlyGuests><SignupPage /></OnlyGuests>} />
<Route path="/signup/avatar" element={<OnlyGuests><SignupAvatarPage /></OnlyGuests>} />
          {/* hvis disse skal være offentlige, behold dem her — ellers flyt dem ned i det beskyttede afsnit */}
          <Route path="/create" element={<CreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/edit/:id" element={<EditRecipePage />} />
          <Route path="/create/link" element={<ImportFromUrlPage />} />
          <Route path="/recipe/:id/done" element={<RecipeDonePage />} />
        </Route>

        {/* 🔐 Beskyttede ruter (kræver login) */}
        <Route
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/result" element={<CategoryResultPage />} />
          <Route path="/categories/filter" element={<FilteredResultPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>

        {/* Fallback: alt ukendt -> welcome */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
