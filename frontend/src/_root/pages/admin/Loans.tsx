import React, { useState } from "react";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("borrow");
  const [form, setForm] = useState({ memberId: "", bookId: "", dueDate: "" });
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openBorrow = () => {
    setModalType("borrow");
    setForm({ memberId: "", bookId: "", dueDate: "" });
    setShowModal(true);
  };

  const openReturn = () => {
    setModalType("return");
    setForm({ memberId: "", bookId: "" });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleReturn = async (id: number) => {};

  const activeLoans = loans.filter((l) => l?.status === "active").length;
  const overdueLoans = loans.filter((l) => l?.status === "overdue").length;
  const returnedLoans = loans.filter((l) => l?.status === "returned").length;

  const filteredLoans = loans.filter(
    (l) =>
      l?.member?.name?.toLowerCase().includes(search.toLowerCase()) ||
      l?.book?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen  p-8 w-full bg-gray-950 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Loans Management</h1>
        <p className="text-gray-500 mt-1">Track book borrowing and returns</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800 hover:border-gray-700 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
                Loans
              </p>
              <p className="text-4xl font-bold text-white mt-2">
                {activeLoans}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-gray-800 flex items-center justify-center">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 font-medium">+12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800 hover:border-gray-700 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
                Overdue Loans
              </p>
              <p className="text-4xl font-bold text-white mt-2">
                {overdueLoans}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-gray-800 flex items-center justify-center">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 font-medium">+12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800 hover:border-gray-700 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
                Returned Loans
              </p>
              <p className="text-4xl font-bold text-white mt-2">
                {returnedLoans}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-gray-800 flex items-center justify-center">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 font-medium">+12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Actions + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by member or book..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openBorrow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Borrow Book
          </button>
          <button
            onClick={openReturn}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Return Book
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">
                Member
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">
                Book
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">
                Loan Date
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">
                Due Date
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">
                Return Date
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td className="py-12 text-center text-gray-400">Loading...</td>
              </tr>
            ) : filteredLoans.length === 0 ? (
              <tr>
                <td className="py-12 text-center text-gray-400">
                  No loans found
                </td>
              </tr>
            ) : (
              filteredLoans.map((loan) => (
                <tr key={loan?.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-800">
                      {loan?.member?.name || loan?.memberId}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 max-w-[200px] truncate">
                    {loan?.book?.title || loan?.bookId}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(
                      loan?.loan_date || loan?.loanDate,
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(
                      loan?.due_date || loan?.dueDate,
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {loan?.return_date || loan?.returnDate
                      ? new Date(
                          loan?.return_date || loan?.returnDate,
                        ).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        loan.status === "active"
                          ? "bg-blue-100 text-blue-700"
                          : loan.status === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {(loan.status === "active" ||
                      loan.status === "overdue") && (
                      <button
                        onClick={() => handleReturn(loan.id)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium transition"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Borrow/Return Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {modalType === "borrow" ? "Borrow Book" : "Return Book"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member ID *
                </label>
                <input
                  type="number"
                  name="memberId"
                  value={form.memberId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter member ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book ID *
                </label>
                <input
                  type="number"
                  name="bookId"
                  value={form.bookId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter book ID"
                />
              </div>
              {modalType === "borrow" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                >
                  {modalType === "borrow" ? "Borrow" : "Return"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
