import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "../providers/AuthProvider.jsx";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import FullscreenLayout from "./layouts/FullscreenLayout.jsx";

// Pages (Main layout)
import HomePage from "../pages/home/HomePage.jsx";
import CategoriesPage from "../pages/categories/CategoriesPage.jsx";
import CategoryResultPage from "../pages/categories/CategoryResultPage.jsx";  
import FilteredResultPage from "../pages/categories/FilteredResultPage.jsx";   // ✅ TILFØJET
import SearchPage from "../pages/search/SearchPage.jsx";                      

// Pages (Fullscreen layout)
import CreatePage from "../pages/create/CreatePage.jsx";
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import ProfileEdit from "../pages/profile/ProfileEdit";
// import DonePage from "./pages/DonePage";
// import LoginPage from "./pages/Auth/LoginPage";
// import SignupFlow from "./pages/Auth/SignupFlow";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 🔹 Layout med PageHeader + BottomNav */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/result" element={<CategoryResultPage />} />
          <Route path="/categories/filter" element={<FilteredResultPage />} /> {/* ✅ ny side */}
          <Route path="/search" element={<SearchPage />} /> {/* ✅ søgesiden */}
        </Route>

        {/* 🔹 Layout uden PageHeader + BottomNav */}
        <Route element={<FullscreenLayout />}>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
        </Route>

        {/* 🔹 Fallback (hvis ingen route matcher) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
