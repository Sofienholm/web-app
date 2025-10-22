import { NavLink } from "react-router";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/create">+</NavLink>
      <NavLink to="/categories">Kategorier</NavLink>
      <NavLink to="/profile">Profil</NavLink>
    </nav>
  );
}
