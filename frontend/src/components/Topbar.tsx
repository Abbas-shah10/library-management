import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import useAuthStore from "../store/authStore";

const TopBar = () => {
  const { user, refreshToken, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (refreshToken) {
      await logoutUser(refreshToken);
    }
    logout();
    navigate("/sign-in");
  };

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <button onClick={handleLogout}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </button>
          <Link to={`/profile/${user?.id}`} className="flex-center gap-3">
            <img
              src="/assets/icons/profile-placeholder.svg"
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
