import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  let isAuth = false;
  return (
    <div>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </div>
  );
};

export default AuthLayout;
