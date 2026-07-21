import api from "./axiosInstance";

export const fetchAllLoans = async () => {
  const { data } = await api.get("/loans");
  return data;
};
