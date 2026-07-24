import { useEffect, useState } from "react";
import { Search, UserPlus, MoreVertical } from "lucide-react";
import useUserStore from "@/store/userStore";
import { formatDateTime, userStats } from "@/constants";

const roleColors: Record<string, string> = {
  Admin: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Librarian: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Member: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const Users = () => {
  const [search, setSearch] = useState<string>("");
  const { users, fetchUsers } = useUserStore();

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = {
    total: users.length,
    admins: users.filter((f) => f.role === "Admin").length,
    librarian: users.filter((f) => f.role === "Librarian").length,
    member: users.filter((f) => f.role === "Member").length,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-400 mt-1">
              Manage library staff and members
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all">
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by username or email..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Librarian</option>
            <option>Member</option>
          </select>
          <select className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="All Members" value={stats.total} change="12%" />
          <StatCard label="Admin" value={stats.admins} change="13%" />
          <StatCard label="Librarian" value={stats.librarian} change="0" />
          <StatCard label="Member" value={stats.member} change="0" />
        </div>

        {/* Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500">
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-left p-4 font-medium w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${roleColors[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-green-500 text-emerald-300"
                            : "bg-blue-700 text-blue-400"
                        }`}
                      >
                        {user.isActive}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 hidden lg:table-cell">
                      {formatDateTime(user.created_at)}
                    </td>
                    <td className="p-4">
                      <button className="p-1 rounded hover:bg-gray-700 text-gray-500 hover:text-white transition">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-400">Showing 1-5 of 1,542 users</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white transition">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-purple-600/20 border border-purple-500/30 rounded-lg text-sm text-purple-300">
              1
            </button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white transition">
              2
            </button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white transition">
              3
            </button>
            <span className="text-gray-600">...</span>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white transition">
              52
            </button>
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  change,
}: {
  label: string;
  value: number;
  change: string;
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800 hover:border-gray-700 transition">
      <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
        {label}
      </p>
      <p className="text-4xl font-bold text-white mt-2">{value}</p>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-green-400 font-medium">{change}</span>
        <span className="text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  );
};
export default Users;
