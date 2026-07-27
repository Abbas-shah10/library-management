import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import useLoanStore from "../../../store/loanStore";
import useFineStore from "../../../store/fineStore";
import useReservationStore from "../../../store/reservationStore";

const MemberDashboard = () => {
  const { user } = useAuthStore();
  const { loans, fetchLoans } = useLoanStore();
  const { fines, fetchAllFines } = useFineStore();
  const { reservations, fetchAllReservation } = useReservationStore();

  const memberId = user?.member_id;

  useEffect(() => {
    fetchLoans();
    fetchAllFines();
    fetchAllReservation();
  }, []);

  const myLoans = useMemo(
    () => loans?.filter((l) => l.member_id === memberId) || [],
    [loans, memberId],
  );

  const activeLoans = myLoans.filter(
    (l) => l.status === "active" || !l.return_date,
  ).length;

  const overdueLoans = myLoans.filter(
    (l) =>
      l.status === "overdue" ||
      (!l.return_date && new Date(l.due_date) < new Date()),
  ).length;

  const returnedLoans = myLoans.filter((l) => l.status === "returned").length;

  const myFines = useMemo(
    () => fines?.filter((f: any) => f.member_id === memberId) || [],
    [fines, memberId],
  );

  const pendingFines = myFines.filter((f: any) => !f.paid).length;
  const pendingFinesTotal = myFines
    .filter((f: any) => !f.paid)
    .reduce((sum: number, f: any) => sum + parseFloat(f.amount || "0"), 0)
    .toFixed(2);

  const activeReservations = useMemo(
    () =>
      reservations?.filter(
        (r) => r.member_id === memberId && r.status === "waiting",
      ) || [],
    [reservations, memberId],
  );

  const currentlyBorrowed = myLoans.filter(
    (l) => l.status === "active" || (!l.return_date && l.status !== "returned"),
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">
              Welcome back, {user?.username}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
              Member
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Borrowed</p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg">📖</div>
              </div>
              <p className="text-3xl font-bold">{activeLoans}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Returned</p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg">✅</div>
              </div>
              <p className="text-3xl font-bold">{returnedLoans}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Fines</p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-lg">💰</div>
              </div>
              <p className="text-3xl font-bold">{pendingFines}</p>
              {pendingFines > 0 && (
                <p className="text-xs text-amber-400 mt-1">${pendingFinesTotal} unpaid</p>
              )}
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Reservations</p>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">🔖</div>
              </div>
              <p className="text-3xl font-bold">{activeReservations.length}</p>
            </div>
          </div>

          {/* Overdue Alert */}
          {overdueLoans > 0 && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="font-semibold text-rose-300">
                  You have {overdueLoans} overdue book{overdueLoans > 1 ? "s" : ""}!
                </p>
                <p className="text-sm text-gray-400">
                  Please return them as soon as possible to avoid additional fines.
                </p>
              </div>
              <Link
                to="/my-books"
                className="ml-auto px-4 py-2 bg-rose-500/20 text-rose-300 rounded-lg text-sm hover:bg-rose-500/30 transition"
              >
                View My Books
              </Link>
            </div>
          )}

          {/* Currently Borrowed Books */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold">Currently Borrowed</h3>
              <Link to="/my-books" className="text-sm text-purple-400 hover:text-purple-300">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500">
                    <th className="text-left p-4 font-medium">Book</th>
                    <th className="text-left p-4 font-medium">Borrowed</th>
                    <th className="text-left p-4 font-medium">Due Date</th>
                    <th className="text-left p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentlyBorrowed.map((loan) => {
                    const isOverdue =
                      loan.status === "overdue" ||
                      (!loan.return_date && new Date(loan.due_date) < new Date());
                    return (
                      <tr
                        key={loan.id}
                        className="border-b border-gray-800/50 hover:bg-gray-800/30"
                      >
                        <td className="p-4 text-gray-200">
                          {(loan as any).Book?.title || `Book #${loan.book_id}`}
                        </td>
                        <td className="p-4 text-gray-400">{loan.loan_date}</td>
                        <td className="p-4 text-gray-400">{loan.due_date}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              isOverdue
                                ? "bg-rose-500/20 text-rose-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            }`}
                          >
                            {isOverdue ? "Overdue" : "Active"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {currentlyBorrowed.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        You have no borrowed books
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/books"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-purple-700 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🔍
                </div>
                <div>
                  <h3 className="font-semibold">Browse Books</h3>
                  <p className="text-sm text-gray-400">Search the catalog</p>
                </div>
              </div>
            </Link>
            <Link
              to="/my-books"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-blue-700 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  📚
                </div>
                <div>
                  <h3 className="font-semibold">My Books</h3>
                  <p className="text-sm text-gray-400">Track your loans</p>
                </div>
              </div>
            </Link>
            <Link
              to="/reservations"
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-emerald-700 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🔖
                </div>
                <div>
                  <h3 className="font-semibold">Reservations</h3>
                  <p className="text-sm text-gray-400">View your holds</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Active Reservations */}
          {activeReservations.length > 0 && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-5 border-b border-gray-800">
                <h3 className="font-semibold">Active Reservations</h3>
              </div>
              <div className="divide-y divide-gray-800/50">
                {activeReservations.map((res) => (
                  <div key={res.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-gray-200">{res.Book?.title || `Book #${res.book_id}`}</p>
                      <p className="text-xs text-gray-500">{res.reservation_date}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300">
                      {res.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;
