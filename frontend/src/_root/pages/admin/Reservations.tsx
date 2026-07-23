import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Reservation {
  id: number;
  book_id: number;
  member_id: number;
  reservation_date: string;
  status: string;
  Book?: { id: number; title: string };
  Member?: { id: number; name: string; email: string };
}

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    book_id: "",
    member_id: "",
    reservation_date: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("/api/v1/reservations");
      const data = res.data?.data?.reservations ?? res.data?.data ?? res.data;
      setReservations(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.patch(`/api/v1/reservations/${id}`, { status });
      toast.success(`Reservation ${status}`);
      fetchReservations();
    } catch {
      toast.error("Failed to update");
    }
  };

  const total = reservations.length;
  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const cancelled = reservations.filter((r) => r.status === "cancelled").length;

  const filtered = reservations.filter(
    (r) =>
      r.Book?.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.Member?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen p-8 w-full bg-gray-950 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Reservations</h1>
        <p className="text-gray-400 mt-1">
          Manage book reservations and requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total",
            value: total,
            color: "text-blue-400",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
          },
          {
            label: "Pending",
            value: pending,
            color: "text-yellow-400",
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            label: "Confirmed",
            value: confirmed,
            color: "text-emerald-400",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            label: "Cancelled",
            value: cancelled,
            color: "text-red-400",
            icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800 hover:border-gray-700 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  {stat.label}
                </p>
                <p className={`text-4xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={stat.icon}
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Create */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by book or member..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-500"
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
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition"
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
          New Reservation
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Book
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Member
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Date
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Status
              </th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No reservations found
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-800/50 transition">
                  <td className="py-4 px-6 font-medium text-gray-200">
                    {r.Book?.title || `Book #${r.book_id}`}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-200">
                      {r.Member?.name || `Member #${r.member_id}`}
                    </span>
                    {r.Member?.email && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {r.Member.email}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {new Date(r.reservation_date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        r.status === "pending"
                          ? "bg-yellow-900/50 text-yellow-400 border border-yellow-700"
                          : r.status === "confirmed"
                            ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                            : r.status === "fulfilled"
                              ? "bg-blue-900/50 text-blue-400 border border-blue-700"
                              : "bg-red-900/50 text-red-400 border border-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      {r.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(r.id, "confirmed")}
                            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(r.id, "cancelled")}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {r.status === "confirmed" && (
                        <button
                          onClick={() => updateStatus(r.id, "fulfilled")}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
                        >
                          Fulfill
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-gray-200">
                New Reservation
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-300 transition"
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
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Book ID *
                </label>
                <input
                  type="number"
                  name="book_id"
                  value={form.book_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Enter book ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Member ID *
                </label>
                <input
                  type="number"
                  name="member_id"
                  value={form.member_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Enter member ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Reservation Date *
                </label>
                <input
                  type="date"
                  name="reservation_date"
                  value={form.reservation_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition font-medium"
                >
                  {submitting ? "Creating..." : "Create Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
