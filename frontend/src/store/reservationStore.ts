import { create } from "zustand";
import * as reservationApi from "../api/reservationApi";

interface Reservation {
  id: number;
  book_id: number;
  member_id: number;
  reservation_date: string;
  Book?: { id: number; title: string };
  Member?: { id: number; name: string; email: string };
  status: "waiting" | "fulfilled" | "cancelled";
}

interface ReservationState {
  reservations: Reservation[];
  reservation: null;
  error: null | string;
  loading: boolean;
  fetchAllReservation: () => Promise<void>;
  cancelReservation: (id: number) => Promise<void>;
  fulfillReservation: (id: number) => Promise<void>;
}

const useReservationStore = create<ReservationState>((set) => ({
  reservations: [],
  reservation: null,
  error: null,
  loading: false,

  fetchAllReservation: async () => {
    set({ loading: true, error: null });
    try {
      const data = await reservationApi.fetchAllReservation();
      set({
        reservations: data.reservations || data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to Fetched reservations",
        loading: false,
      });
    }
  },
  cancelReservation: async (reservationId: number) => {
    set({ loading: true, error: null });
    try {
      await reservationApi.cancelReservation(reservationId);
      set((state) => ({
        reservations: state.reservations.map((r) =>
          r.id === reservationId ? { ...r, status: "cancelled" } : r,
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to cancel reservation",
        loading: false,
      });
    }
  },
  fulfillReservation: async (reservationId: number) => {
    set({ loading: true, error: null });
    try {
      await reservationApi.fulfillReservation(reservationId);
      set((state) => ({
        reservations: state.reservations.map((r) =>
          r.id === reservationId ? { ...r, status: "fulfilled" } : r,
        ),
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fulfill reservation",
        loading: false,
      });
    }
  },
}));

export default useReservationStore;
