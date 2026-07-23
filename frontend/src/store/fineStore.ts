import { create } from "zustand";
import * as fineApi from "../api/fineApi";

interface Fine {
  loan_id: string;
  amount: string;
  paid: boolean;
}

interface FineState {
  fines: Fine[];
  fine: null;
  error: string | null;
  loading: boolean;
  fetchAllFines: () => Promise<void>;
  waiveFine: (fineId: number) => Promise<void>;
  createFine: (payload: Fine) => Promise<void>;
  payFine: (id: number) => Promise<void>;
}

const useFineStore = create<FineState>((set) => ({
  fines: [],
  fine: null,
  error: null,
  loading: false,

  fetchAllFines: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fineApi.getAllFines();
      const raw = res.data?.fines ?? [];
      set({
        fines: Array.isArray(raw) ? raw : [],
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch book",
        loading: false,
      });
    }
  },
  waiveFine: async (fineId: number) => {
    set({ loading: false, error: null });
    try {
      await fineApi.waiveFine(fineId);
      set((state) => ({
        fines: state.fines.filter((f) => f.id !== fineId),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch book",
        loading: false,
      });
    }
  },

  createFine: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await fineApi.createFine(payload);

      set((state) => ({
        fines: [...state.fines, data.data || data],
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch book",
        loading: false,
      });
    }
  },

  payFine: async (id) => {
    set({ loading: true, error: null });
    try {
      await fineApi.payFine(id);

      set((state) => ({
        fines: state.fines.filter((fine) => !fine.paid),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch book",
        loading: false,
      });
    }
  },
}));

export default useFineStore;
