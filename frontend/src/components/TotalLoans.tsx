import { Link } from "react-router-dom";

const TotalLoans = ({ loans }: { loans: any[] }) => {
  const total = loans?.length;
  const active = loans?.filter((l) => !l.return_date).length;
  const returned = loans?.filter((l) => l.return_date).length;
  const overdue = loans?.filter(
    (l) => !l.return_date && new Date(l.due_date) < new Date(),
  ).length;
  const onTime = active - overdue;
  const pct = total > 0 ? Math.round((returned / total) * 100) : 0;

  return (
    <Link to="/admin/loans">
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Loans
            </p>
            <p className="text-3xl font-bold text-white mt-1">{total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-gray-400">Returned</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{returned}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-gray-400">Active</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{active}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-gray-400">On Time</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{onTime}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-gray-400">Overdue</span>
            </div>
            <p className="text-white font-bold text-lg mt-1">{overdue}</p>
          </div>
        </div>

        <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {pct}% of all loans have been returned
        </p>
      </div>
    </Link>
  );
};

export default TotalLoans;
