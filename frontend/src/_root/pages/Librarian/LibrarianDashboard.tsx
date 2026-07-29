import { useEffect } from "react";
import { Link } from "react-router-dom";
import useBookStore from "@/store/bookStore";
import useAuthStore from "@/store/authStore";
import useLoanStore from "@/store/loanStore";
import useMemberStore from "@/store/memberStore";

const LibrarianDashboard = () => {
  const { user } = useAuthStore();
  const { books, fetchBooks } = useBookStore();
  const { loans, fetchLoans } = useLoanStore();
  const { members, fetchAllMembers } = useMemberStore();

  useEffect(() => {
    fetchBooks();
    fetchLoans();
    fetchAllMembers();
  }, []);

  const totalBooks = books?.length || 0;
  const totalMembers = members?.length || 0;
  const activeLoans = loans?.filter((l) => l.status === "active").length || 0;
  const overdueLoans =
    loans?.filter(
      (l) =>
        l.status === "overdue" ||
        (!l.return_date && new Date(l.due_date) < new Date()),
    ).length || 0;
  const returnedLoans =
    loans?.filter((l) => l.status === "returned").length || 0;

  const recentLoans = [...(loans || [])]
    .sort(
      (a, b) =>
        new Date(b.loan_date).getTime() - new Date(a.loan_date).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">
              Hello, {user?.username} Librarian
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Total Books
                </p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                  📚
                </div>
              </div>
              <p className="text-3xl font-bold">{totalBooks}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Active Loans
                </p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg">
                  📖
                </div>
              </div>
              <p className="text-3xl font-bold">{activeLoans}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Overdue
                </p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-lg">
                  ⚠️
                </div>
              </div>
              <p className="text-3xl font-bold text-rose-400">{overdueLoans}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Members
                </p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg">
                  👥
                </div>
              </div>
              <p className="text-3xl font-bold">{totalMembers}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/librarian/issue"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-purple-700 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📤
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Issue Book</h3>
                  <p className="text-sm text-gray-400">
                    Borrow a book to a member
                  </p>
                </div>
              </div>
            </Link>
            <Link
              to="/librarian/return"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-blue-700 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📥
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Return Book</h3>
                  <p className="text-sm text-gray-400">Accept a book return</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Overdue Alert */}
          {overdueLoans > 0 && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="font-semibold text-rose-300">
                  {overdueLoans} overdue loan{overdueLoans > 1 ? "s" : ""} need
                  {overdueLoans === 1 ? "s" : ""} attention
                </p>
                <p className="text-sm text-gray-400">
                  Check the overdue section to follow up.
                </p>
              </div>
              <Link
                to="/librarian/overdue"
                className="ml-auto px-4 py-2 bg-rose-500/20 text-rose-300 rounded-lg text-sm hover:bg-rose-500/30 transition"
              >
                View Overdue
              </Link>
            </div>
          )}

          {/* Recent Loans */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold">Recent Loans</h3>
              <Link
                to="/librarian/loans"
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                View All
              </Link>
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
                  {recentLoans.map((loan) => (
                    <tr
                      key={loan.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30"
                    >
                      <td className="p-4 text-gray-200">
                        {(loan as any).Member?.name ||
                          `Member #${loan.member_id}`}
                      </td>
                      <td className="p-4 text-gray-200">
                        {(loan as any).Book?.title || `Book #${loan.book_id}`}
                      </td>
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
                  {recentLoans.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No loans yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-sm text-gray-400">Returned</span>
              </div>
              <p className="text-2xl font-bold">{returnedLoans}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-sm text-gray-400">Active</span>
              </div>
              <p className="text-2xl font-bold">{activeLoans}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="text-sm text-gray-400">Overdue</span>
              </div>
              <p className="text-2xl font-bold text-rose-400">{overdueLoans}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
