import CreateFineModal from "@/components/CreateFineModal";
import useFineStore from "@/store/fineStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Fines = () => {
  const { fetchAllFines, fines, waiveFine, payFine } = useFineStore();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [selectedFine, setSelectedFine] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  useEffect(() => {
    fetchAllFines();
  }, []);

  const totalFines = fines?.length;
  const unpaidFines = fines?.filter((f) => !f.paid).length;
  const paidFines = fines?.filter((f) => f.paid).length;
  const totalAmount = fines?.reduce((sum, f) => sum + parseFloat(f.amount), 0);
  const unpaidAmount = fines
    ?.filter((f) => !f.paid)
    ?.reduce((sum, f) => sum + parseFloat(f.amount), 0);

  const filteredFines = fines.filter(
    (f) =>
      f?.Loan?.Member?.name?.toLowerCase().includes(search.toLowerCase()) ||
      f?.Loan?.Book?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const handlePayFine = async (id: number) => {
    try {
      await payFine(id);
      toast.success("Fine paid successfully");
    } catch (error) {
      toast.error("Error paying fine!!");
    }
  };

  const handlePayAll = async (memberId: number) => {};

  const handleWaive = async (id: number) => {
    try {
      await waiveFine(id);
      toast("Fine successfully Waived");
    } catch (error: any) {
      console.log(error.message || "Could not waive fine");
    }
  };

  const openPayModal = (fine: any) => {
    setSelectedFine(fine);
    setPayAmount(fine.amount);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-8 w-full bg-gray-950 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Fines Management</h1>
        <p className="text-gray-300 mt-1">Track and manage library fines</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800">
          <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
            Total Fines
          </p>
          <p className="text-4xl font-bold text-white mt-2">{totalFines}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">
              ${totalAmount.toFixed(2)} total
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800">
          <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
            Unpaid
          </p>
          <p className="text-4xl font-bold text-red-400 mt-2">{unpaidFines}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-400 font-medium">
              ${unpaidAmount.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800">
          <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
            Paid
          </p>
          <p className="text-4xl font-bold text-green-400 mt-2">{paidFines}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 font-medium">
              ${(totalAmount - unpaidAmount).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
              Collection
            </p>
            <span className="text-xs text-gray-500">Rate</span>
          </div>
          <div className="mt-4">
            <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all"
                style={{
                  width: `${totalFines > 0 ? Math.round((paidFines / totalFines) * 100) : 0}%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {totalFines > 0 ? Math.round((paidFines / totalFines) * 100) : 0}%
              collected
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
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
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
        >
          + Create Fine
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Member
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Book
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Amount
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Fine Date
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Status
              </th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : filteredFines.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  No fines found
                </td>
              </tr>
            ) : (
              filteredFines.map((fine) => (
                <tr key={fine.id} className="hover:bg-gray-700/50 transition">
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-200">
                      {fine.Loan?.Member?.name ||
                        `Member #${fine.Loan?.member_id}`}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400 max-w-[200px] truncate">
                    {fine.Loan?.Book?.title || `Book #${fine.Loan?.book_id}`}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-white">
                      ${parseFloat(fine.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {new Date(fine.fine_date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        fine.paid
                          ? "bg-green-900/50 text-green-400"
                          : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      {fine.paid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!fine.paid && (
                        <>
                          <button
                            onClick={() => handlePayFine(fine.id)}
                            className="px-3 py-1.5 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                          >
                            Pay
                          </button>
                          <button
                            onClick={() => handleWaive(fine.id)}
                            className="px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                          >
                            Waive
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pay Modal */}
      {showModal && selectedFine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Pay Fine</h2>
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
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Member</span>
                  <span className="font-medium text-gray-800">
                    {selectedFine.Loan?.Member?.name}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Book</span>
                  <span className="font-medium text-gray-800">
                    {selectedFine.Loan?.Book?.title}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">Amount Due</span>
                  <span className="font-bold text-lg text-red-600">
                    ${parseFloat(selectedFine.amount).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handlePayFine(selectedFine.id);
                    setShowModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-medium"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <CreateFineModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => fetchAllFines()}
        />
      )}
    </div>
  );
};

export default Fines;
