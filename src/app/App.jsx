import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "../providers/AuthProvider.jsx";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import FullscreenLayout from "./layouts/FullscreenLayout.jsx";

// Pages (Main layout)
import HomePage from "../pages/home/HomePage.jsx";
import CategoriesPage from "../pages/categories/CategoriesPage.jsx";
import CategoryResultPage from "../pages/categories/CategoryResultPage.jsx";  
import FilteredResultPage from "../pages/categories/FilteredResultPage.jsx";
import SearchPage from "../pages/search/SearchPage.jsx";

// Pages (Fullscreen layout)
import CreatePage from "../pages/create/CreatePage.jsx";
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import ProfileEdit from "../pages/profile/ProfileEdit.jsx";

import WelcomeIntroPage from "../pages/auth/WelcomeIntroPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import SignupPage from "../pages/auth/SignupPage.jsx";
import SignupAvatarPage from "../pages/auth/SignupAvatarPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 🔹 Layout med PageHeader + BottomNav */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/result" element={<CategoryResultPage />} />
          <Route path="/categories/filter" element={<FilteredResultPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>

        {/* 🔹 Layout uden PageHeader + BottomNav */}
        <Route element={<FullscreenLayout />}>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />

          {/* nye auth sider */}
          <Route path="/welcome" element={<WelcomeIntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/avatar" element={<SignupAvatarPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
