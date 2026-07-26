import api from "./axiosInstance";

type Props = {
  member_id: string;
  book_id: string;
  due_date: string;
};

export const fetchAllLoans = async () => {
  const { data } = await api.get("/loans");
  return data;
};

export const borrowBook = async (payload: Props) => {
  const { data } = await api.post(`/loans`, payload);
  return data;
};
