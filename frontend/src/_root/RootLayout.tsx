import TopBar from "../components/Topbar";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LeftSidebar from "../components/LeftSidebar";

const RootLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="w-full ">
      <TopBar />

      <LeftSidebar />
      <section className="flex flex-1 h-full ml-[260px]">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
