import { useEffect } from "react";
import useAuthStore from "../../../store/authStore";
import useBookStore from "../../../store/bookStore";
import TotalBooks from "../../../components/TotalBooks";
import useLoanStore from "@/store/loanStore";
import TotalLoans from "@/components/TotalLoans";
import TotalMembers from "@/components/TotalMembers";
import useMemberStore from "@/store/memberStore";
import TotalUsers from "@/components/TotalUsers";
import useUserStore from "@/store/userStore";

const Dashboard = () => {
  const { loans, fetchLoans } = useLoanStore();
  const { users, fetchUsers } = useUserStore();
  const { members, fetchAllMembers } = useMemberStore();
  const { user } = useAuthStore();
  const { fetchBooks, books } = useBookStore();
  useEffect(() => {
    fetchBooks();
    fetchLoans();
    fetchAllMembers();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">
              Hello, Mr.{user?.username} Admin
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              🔔
            </button>
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              ⚙️
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TotalBooks books={books} />
            <TotalLoans loans={loans} />
            <TotalMembers members={members} />
            <TotalUsers users={users} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="font-semibold mb-4">Monthly Loans</h3>
              <div className="flex items-end gap-2 h-40">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 88].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-xs text-gray-500">
                        {
                          [
                            "J",
                            "F",
                            "M",
                            "A",
                            "M",
                            "J",
                            "J",
                            "A",
                            "S",
                            "O",
                            "N",
                            "D",
                          ][i]
                        }
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <h3 className="font-semibold mb-4">Book Categories</h3>
              <div className="space-y-3">
                {[
                  { label: "Fiction", count: 320, pct: 75 },
                  { label: "Non-Fiction", count: 280, pct: 60 },
                  { label: "Science", count: 190, pct: 45 },
                  { label: "History", count: 150, pct: 35 },
                  { label: "Technology", count: 120, pct: 30 },
                ].map((cat) => (
                  <div key={cat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{cat.label}</span>
                      <span className="text-gray-500">{cat.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold">Recent Loans</h3>
              <button className="text-sm text-purple-400 hover:text-purple-300">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500">
                    <th className="text-left p-4 font-medium">Member</th>
                    <th className="text-left p-4 font-medium">Book</th>
                    <th className="text-left p-4 font-medium">Loan Date</th>
                    <th className="text-left p-4 font-medium">Due Date</th>
                    <th className="text-left p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr
                      key={loan?.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30"
                    >
                      <td className="p-4 text-gray-200">{loan.Member?.name}</td>
                      <td className="p-4 text-gray-200">{loan.Book?.title}</td>
                      <td className="p-4 text-gray-400">{loan.loan_date}</td>
                      <td className="p-4 text-gray-400">{loan.due_date}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            loan.status === "active"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : loan.status === "overdue"
                                ? "bg-rose-500/20 text-rose-300"
                                : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
