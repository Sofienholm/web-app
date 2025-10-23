import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "../providers/AuthProvider.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import FullscreenLayout from "./layouts/FullscreenLayout.jsx";

// Pages
import HomePage from "../pages/home/HomePage.jsx";
import CreatePage from "../pages/create/CreatePage.jsx";
// import RecipeDetail from "./pages/Recipe/RecipeDetail";
// import RecipeEdit from "./pages/Recipe/RecipeEdit";
// import CategoriesPage from "./pages/CategoriesPage";
// import ProfilePage from "./pages/ProfilePage";
// import DonePage from "./pages/DonePage";
// import LoginPage from "./pages/Auth/LoginPage";
// import SignupFlow from "./pages/Auth/SignupFlow";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Layout med PageHeader + BottomNav */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} /> */}
        </Route>

        {/* Layout uden PageHeader + BottomNav */}
        <Route element={<FullscreenLayout />}>
          <Route path="/create" element={<CreatePage />} />

          {/* <Route path="/done" element={<DonePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupFlow />} /> */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
