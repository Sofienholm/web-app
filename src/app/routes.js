import HomePage from "../pages/Home/HomePage";
import CreatePage from "../pages/Create/CreatePage";
import RecipeDetail from "../pages/Recipe/RecipeDetail";
import CategoriesPage from "../pages/Categories/CategoriesPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import DonePage from "../pages/Done/DonePage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupFlow from "../pages/Auth/SignupFlow";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/recipe/:id", element: <RecipeDetail /> },
  { path: "/categories", element: <CategoriesPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/done", element: <DonePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupFlow /> },
];
