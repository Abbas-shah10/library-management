import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/sign-in" replace />;

  if (user.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "Librarian")
    return <Navigate to="/librarian/dashboard" replace />;
  return <Navigate to="/member/dashboard" replace />;
};

export default Home;
