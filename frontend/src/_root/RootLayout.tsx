import TopBar from "../components/Topbar";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const RootLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="w-full md:flex">
      <TopBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
