import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import useAuthStore from "../store/authStore";
import { Home, BookOpen, LogOut, User } from "lucide-react";

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
    <header className="stickey top-0 z-50 w-full border-b border-white/10 bg-dark-2/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">
            LibraryMS
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Profile */}
          <Link
            to={`/profile/${user?.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white leading-tight">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role || "Member"}
              </p>
            </div>
          </Link>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
            title="Logout"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            <span className="hidden sm:block text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
