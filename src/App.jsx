import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./providers/AuthProvider";
import BottomNav from "./components/layout/BottomNav";
import PageHeader from "./components/layout/PageHeader";

// Pages
// import HomePage from "./pages/Home/HomePage";
import CreatePage from "./pages/CreatePage";
// import RecipeDetail from "./pages/Recipe/RecipeDetail";
// import RecipeEdit from "./pages/Recipe/RecipeEdit";
// import CategoriesPage from "./pages/CategoriesPage";
// import ProfilePage from "./pages/ProfilePage";
// import DonePage from "./pages/DonePage";
// import LoginPage from "./pages/Auth/LoginPage";
// import SignupFlow from "./pages/Auth/SignupFlow";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PageHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipe/:id/edit" element={<RecipeEdit />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/done" element={<DonePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupFlow />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <BottomNav />
      </AuthProvider>
    </BrowserRouter>
  );
}
