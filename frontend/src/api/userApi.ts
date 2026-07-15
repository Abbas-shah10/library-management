import api from "./axiosInstance";

export const fetchAllusers = async () => {
  const { data } = await api.get("/users");
  return data;
};
