import api from "./axiosInstance";

export const createFine = async (payload: {
  loan_id: number;
  amount: number;
}) => {
  const { data } = await api.post(`/fines`, payload);
  return data;
};

export const getAllFines = async () => {
  const { data } = await api.get("/fines");
  return data;
};

export const waiveFine = async (fineId: number) => {
  const { data } = await api.delete(`/fines/${fineId}/waive`);
  return data;
};
