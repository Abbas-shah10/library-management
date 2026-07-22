import useFineStore from "@/store/fineStore";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface CreateFineModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateFineModal = ({
  open,
  onClose,
  onSuccess,
}: CreateFineModalProps) => {
  const { createFine } = useFineStore();
  const [form, setForm] = useState({
    loan_id: "",
    amount: "",
    fine_date: "",
    paid: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createFine({
        loan_id: form.loan_id,
        amount: form.amount,
        paid: form.paid,
      });
      toast.success("Fine created successfully");
      onSuccess();
      onClose();
      setForm({ loan_id: "", amount: "", fine_date: "", paid: false });
    } catch {
      toast.error("Failed to create fine");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-gray-200">Create Fine</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition"
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
              Loan ID *
            </label>
            <input
              type="number"
              name="loan_id"
              value={form.loan_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter loan ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Amount *
            </label>
            <input
              type="number"
              step="0.01"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Fine Date *
            </label>
            <input
              type="date"
              name="fine_date"
              value={form.fine_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition font-medium"
            >
              {submitting ? "Creating..." : "Create Fine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFineModal;
