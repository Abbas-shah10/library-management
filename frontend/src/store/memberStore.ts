import { create } from "zustand";
import * as memberApi from "../api/memberApi";

interface Member {
  name: string;
  email: string;
  phone: string;
  address: string;
  membership_date: string;
  membership_type: string;
  max_books_allowed: string;
  createdAt: string;
}

interface MemberState {
  members: Member[];
  member: Member | null;
  loading: boolean;
  error: string | null;
  createMember: (payload: Partial<Member>) => Promise<void>;
  fetchAllMembers: () => Promise<void>;
  deleteMember: (memberId: number) => Promise<void>;
}

const useMemberStore = create<MemberState>((set) => ({
  members: [],
  member: null,
  loading: false,
  error: null,

  createMember: async (payload: Partial<Member>) => {
    set({ loading: true, error: null });

    try {
      const data = await memberApi.createMember(payload);

      set((state) => ({
        members: [...state.members, data.data || data.data.member],
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create book",
        loading: false,
      });
    }
  },

  fetchAllMembers: async () => {
    try {
      set({ loading: true, error: null });

      const data = await memberApi.fetchAllMembers();
      const members =
        data.data?.members || data?.members || data?.members || [];
      set({
        members: Array.isArray(members) ? members : [],
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create book",
        loading: false,
      });
    }
  },

  deleteMember: async (memberId: number) => {
    try {
      set({ loading: true, error: null });

      await memberApi.deleteMember(memberId);

      set((state) => ({
        members: state.members.filter((m) => m?.id !== memberId),
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create book",
        loading: false,
      });
    }
  },
}));

export default useMemberStore;
