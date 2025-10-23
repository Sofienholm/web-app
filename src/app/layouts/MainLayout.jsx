import PageHeader from "../../components/layout/PageHeader";
import BottomNav from "../../components/layout/BottomNav";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <PageHeader />
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
