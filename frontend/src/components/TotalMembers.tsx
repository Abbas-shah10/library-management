import { Link } from "react-router-dom";

const TotalMembers = ({ members }: { members: any[] }) => {
  const total = members?.length;
  const student = members?.filter(
    (m) => m.membership_type === "Student",
  ).length;
  const faculty = members?.filter(
    (m) => m.membership_type === "Faculty",
  ).length;
  const pub = members?.filter((m) => m.membership_type === "Public").length;
  const activeMembers = members?.filter((m) => m.status !== "suspended").length;
  const pct = total > 0 ? Math.round((activeMembers / total) * 100) : 0;

  return (
    <Link to="/admin/members">
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Total Members
            </p>
            <p className="text-3xl font-bold text-white mt-1">{total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-gray-400">Student</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{student}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-gray-400">Faculty</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{faculty}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-gray-400">Public</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{pub}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-gray-400">Active</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{activeMembers}</p>
          </div>
        </div>

        <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {pct}% of members are active
        </p>
      </div>
    </Link>
  );
};

export default TotalMembers;
