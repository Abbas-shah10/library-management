import { create } from "zustand";
import * as userApi from "../api/userApi";
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Member" | "Librarian";
  member_id: null | number;
  isActive: boolean;
  created_at: string;
}

interface UserState {
  users: User[];
  user: any | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  // fetchUser: (id: number) => Promise<void>;
  // createUser: (payload: any) => Promise<void>;
  // updateUser: (id: number, payload: any) => Promise<void>;
  // deleteUser: (id: number) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  user: null,
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null }); // start loading, clear old error
    try {
      const data = await userApi.fetchAllusers();
      set({ users: data.data?.users || data.users || data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },
}));

export default useUserStore;
