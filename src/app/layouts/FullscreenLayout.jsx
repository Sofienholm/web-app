import { Outlet } from "react-router";

export default function FullscreenLayout() {
  return (
    <main className="fullscreen">
      <Outlet />
    </main>
  );
}
