import {
  BarChart3,
  BookDown,
  Bookmark,
  BookMarked,
  BookOpen,
  BookUp,
  CircleDollarSign,
  ClockAlert,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";

// Admin sidebar
export const adminLinks = [
  { icon: LayoutDashboard, route: "/admin/dashboard", label: "Dashboard" },
  { icon: Users, route: "/admin/users", label: "Users" },
  { icon: BookOpen, route: "/admin/books", label: "Books" },
  { icon: BarChart3, route: "/admin/reports", label: "Reports" },
  { icon: Settings, route: "/admin/settings", label: "Settings" },
];

// Librarian sidebar
export const librarianLinks = [
  { icon: LayoutDashboard, route: "/librarian/dashboard", label: "Dashboard" },
  { icon: BookUp, route: "/librarian/issue", label: "Issue Book" },
  { icon: BookDown, route: "/librarian/return", label: "Return Book" },
  { icon: Users, route: "/librarian/members", label: "Members" },
  { icon: ClockAlert, route: "/librarian/overdue", label: "Overdue" },
];

// Member sidebar
export const memberLinks = [
  { icon: Home, route: "/", label: "Home" },
  { icon: Search, route: "/books", label: "Browse" },
  { icon: BookMarked, route: "/my-books", label: "My Books" },
  { icon: Bookmark, route: "/reservations", label: "Reservations" },
  { icon: CircleDollarSign, route: "/fines", label: "Fines" },
  { icon: User, route: "/profile", label: "Profile" },
  { icon: User, route: "/profile", label: "Profile" },
];
