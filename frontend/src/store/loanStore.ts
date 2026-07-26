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
  borrowBook: (payload: Partial<Loan>) => Promise<void>;
  returnBook: (loanId: number) => Promise<void>;
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
  borrowBook: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await loanApi.borrowBook(payload);
      set((state) => ({
        loans: [...state.loans, data.data || data],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to Borrow a book",
        loading: false,
      });
    }
  },
  returnBook: async (loanId: number) => {
    set({ loading: true, error: null });
    try {
      await loanApi.returnBook(loanId);

      set((state) => ({
        loans: state.loans.map((l) =>
          l.id === loanId ? { ...l, status: "returned" } : l,
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to Return book",
        loading: false,
      });
    }
  },
}));

export default useLoanStore;
