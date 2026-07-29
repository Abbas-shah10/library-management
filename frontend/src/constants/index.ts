import {
  BookDown,
  Bookmark,
  BookMarked,
  BookOpen,
  BookUp,
  CircleDollarSign,
  ClipboardList,
  ClockAlert,
  Home,
  LayoutDashboard,
  RefreshCw,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";

// Admin sidebar
export const adminLinks = [
  {
    icon: LayoutDashboard,
    route: "/admin/dashboard",
    label: "Dashboard",
    active: true,
  },
  { icon: BookOpen, route: "/admin/books", label: "Books" },
  { icon: Users, route: "/admin/members", label: "Members" },
  { icon: RefreshCw, route: "/admin/loans", label: "Loans" },
  { icon: CircleDollarSign, route: "/admin/fines", label: "Fines" },
  { icon: ClipboardList, route: "/admin/reservation", label: "Reservations" },
  { icon: Users, route: "/admin/users", label: "Users" },
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
  { icon: Home, route: "/member/dashboard", label: "Home", active: true },
  { icon: Search, route: "/member/books", label: "Browse" },
  { icon: BookMarked, route: "/member/my-books", label: "My Books" },
  { icon: Bookmark, route: "/member/reservations", label: "Reservations" },
  { icon: CircleDollarSign, route: "/member/fines", label: "Fines" },
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
