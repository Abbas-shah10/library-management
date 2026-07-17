import { create } from "zustand";
import * as bookApi from "../api/bookApi";
import type { User } from "./userStore";

interface Book {
  id: number;
  title: string;
  isbn: string;
  publisher?: string;
  publication_year?: number;
  total_copies: number;
  available_copies: number;
  shelf_location?: string;
  category_id?: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  user_id: number | null;
  User: User;
}

interface BookState {
  books: Book[];
  book: Book | null;
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  fetchBook: (id: number) => Promise<void>;
  createBook: (payload: Partial<Book>) => Promise<void>;
  updateBook: (id: number, payload: Partial<Book>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  clearError: () => void;
}

const useBookStore = create<BookState>((set) => ({
  books: [],
  book: null,
  loading: false,
  error: null,

  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const data = await bookApi.getAllBooks();
      const books =
        data.data?.books ||
        data.books ||
        data.bookWithUser ||
        data?.User ||
        data ||
        [];
      set({
        books: Array.isArray(books) ? books : [],
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch books",
        loading: false,
      });
    }
  },

  fetchBook: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await bookApi.getBookById(id);
      const fetchedBook = data?.data?.book || data?.book || data;
      set({ book: fetchedBook, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch book",
        loading: false,
      });
    }
  },

  createBook: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await bookApi.createBook(payload);
      set((state) => ({
        books: [...state.books, data.data || data],
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create book",
        loading: false,
      });
    }
  },

  updateBook: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const data = await bookApi.updateBook(id, payload);
      set((state) => ({
        books: state.books.map((b) =>
          b.id === id ? { ...b, ...(data.data || data) } : b,
        ),
        book: state.book?.id === id ? data.data || data : state.book,
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update book",
        loading: false,
      });
    }
  },

  deleteBook: async (id) => {
    set({ loading: true, error: null });
    try {
      await bookApi.deleteBook(id);
      set((state) => ({
        books: state.books.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete book",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useBookStore;
