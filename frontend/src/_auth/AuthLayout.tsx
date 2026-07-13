import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const AuthLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex flex-1 justify-center items-center flex-col">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
