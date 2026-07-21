import { Link } from "react-router-dom";

const TotalUsers = ({ users }: { users: any[] }) => {
  const total = users?.length;
  const admins = users?.filter((u) => u.role === "Admin").length;
  const librarians = users?.filter((u) => u.role === "Librarian").length;
  const activeUsers = users?.filter((u) => u.status !== "inactive").length;
  const pct = total > 0 ? Math.round((activeUsers / total) * 100) : 0;

  return (
    <Link to="/admin/users">
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Total Users
            </p>
            <p className="text-3xl font-bold text-white mt-1">{total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-gray-400">Admin</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{admins}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-gray-400">Librarian</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{librarians}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-gray-400">Active</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{activeUsers}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-gray-400">Inactive</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">
              {total - activeUsers}
            </p>
          </div>
        </div>

        <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{pct}% of users are active</p>
      </div>
    </Link>
  );
};

export default TotalUsers;
