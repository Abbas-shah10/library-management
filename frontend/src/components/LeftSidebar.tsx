import { NavLink, useLocation } from "react-router-dom";
import { adminLinks } from "../constants";
import type { INavLink } from "../types";
import useAuthStore from "../store/authStore";

const LeftSidebar = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();

  return (
    <nav className="fixed left-0 h-screen w-[260px] bg-[#1a1a23] border-r border-gray-800 p-4 max-sm:hidden">
      <div className="flex flex-col gap-11">
        <ul className="flex flex-col gap-6">
          {user.role === "Admin" &&
            adminLinks.map((link: INavLink) => {
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
                    {link.icon}
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
