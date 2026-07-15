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

export const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Relative (e.g., "2 hours ago")
export const formatRelative = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const userStats = [
  {
    label: "Total Users",
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Admins",
    color: "from-purple-500 to-purple-600",
  },
  {
    label: "Librarians",
    color: "from-blue-500 to-blue-600",
  },
  {
    label: "Members",
    color: "from-emerald-500 to-teal-500",
  },
];
