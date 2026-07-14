import {
  BookDown,
  Bookmark,
  BookMarked,
  BookUp,
  CircleDollarSign,
  ClockAlert,
  Home,
  LayoutDashboard,
  Search,
  User,
  Users,
} from "lucide-react";

// Admin sidebar
export const adminLinks = [
  { icon: "📊", route: "/admin/dashboard", label: "Dashboard", active: true },
  { icon: "📚", route: "/admin/books", label: "Books" },
  { icon: "👥", route: "/admin/members", label: "Members" },
  { icon: "🔄", route: "/admin/loans", label: "Loans" },
  { icon: "💰", route: "/admin/fines", label: "Fines" },
  { icon: "📋", route: "/admin/reservation", label: "Reservations" },
  { icon: "👤", route: "/admin/users", label: "Users" },
  { icon: "⚙️", route: "/admin/settings", label: "Settings" },
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
