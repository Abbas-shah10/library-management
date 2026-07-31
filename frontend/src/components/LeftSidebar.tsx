import { NavLink, useLocation } from "react-router-dom";
import { adminLinks, librarianLinks, memberLinks } from "../constants";
import type { INavLink } from "../types";
import useAuthStore from "../store/authStore";
import Login from "@/_auth/Login";

const roleLinks: Record<string, INavLink[]> = {
  Admin: adminLinks,
  Librarian: librarianLinks,
  Member: memberLinks,
};

const LeftSidebar = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();

  return (
    <nav className="fixed left-0 h-screen w-[260px] bg-gray-50 dark:bg-[#1a1a23] border-r border-gray-200 dark:border-gray-800 p-4 max-sm:hidden">
      <div className="flex flex-col gap-11">
        <ul className="flex flex-col gap-6">
          {user ? (
            roleLinks[user.role]?.map((link) => {
              const isActive = pathname === link.route;
              return (
                <li
                  key={link.route}
                  className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}
                >
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    {typeof link.icon === "string" ? (
                      link.icon
                    ) : (
                      <link.icon className="w-5 h-5" />
                    )}
                    {link.label}
                  </NavLink>
                </li>
              );
            })
          ) : (
            // Show login link when NOT logged in
            <li className="leftsidebar-link group">
              <NavLink to="/login" className="flex gap-4 items-center p-4">
                <Login /> Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
