import { create } from "zustand";
import * as loanApi from "../api/loanApi";

type Loan = {
  id: number;
  book_id: number;
  member_id: number;
  loan_date: string | number;
  due_date: string | number;
  return_date: string | number;
  status: "active" | "returned" | "overdue";
};

interface LoanState {
  loans: Loan[];
  loan: Loan | null;
  loading: boolean;
  error: null | string;
  fetchLoans: () => Promise<void>;
}

const useLoanStore = create<LoanState>((set) => ({
  loans: [],
  loan: null,
  error: null,
  loading: false,

  fetchLoans: async () => {
    set({ loading: true, error: null });

    try {
      const data = await loanApi.fetchAllLoans();

      set({
        loans: data.loans || data.data || [],
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch book",
        loading: false,
      });
    }
  },
}));

export default useLoanStore;
