import api from "./axiosInstance";

export const getAllBooks = async () => {
  const { data } = await api.get("/books");
  return data;
};

export const getBookById = async (bookId: number) => {
  const { data } = await api.get(`/books/${bookId}`);
  return data;
};

export const createBook = async (payload: {
  title: string;
  isbn: string;
  publisher?: string;
  publication_year?: number;
  total_copies?: number;
  shelf_location?: string;
  category_id?: number;
}) => {
  const { data } = await api.post("/books", payload);
  return data;
};

export const updateBook = async (bookId: number, payload: Partial<{
  title: string;
  isbn: string;
  publisher: string;
  publication_year: number;
  total_copies: number;
  shelf_location: string;
  category_id: number;
}>) => {
  const { data } = await api.put(`/books/${bookId}`, payload);
  return data;
};

export const deleteBook = async (bookId: number) => {
  const { data } = await api.delete(`/books/${bookId}`);
  return data;
};
