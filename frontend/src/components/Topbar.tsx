import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import { Home, BookOpen, LogOut, User, Moon, Sun } from "lucide-react";

const TopBar = () => {
  const { user, refreshToken, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (refreshToken) {
      await logoutUser(refreshToken);
    }
    logout();
    navigate("/sign-in");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-dark-2/80">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            LibraryMS
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-500/10 transition-all duration-200 dark:text-gray-400 dark:hover:text-purple-400"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Profile */}
          <Link
            to={`/profile/${user?.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group dark:hover:bg-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900 leading-tight dark:text-white">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize dark:text-gray-400">
                {user?.role || "Member"}
              </p>
            </div>
          </Link>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 group dark:text-gray-400 dark:hover:text-red-400"
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
