import api from "./axiosInstance";

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post("/users/login", { email, password });
  return data;
};

export const registerUser = async (payload: {
  username: string;
  email: string;
  password: string;
  role?: string;
  member_id?: number;
}) => {
  const { data } = await api.post("/users", payload);
  return data;
};

export const logoutUser = async (refreshToken: string) => {
  await api.post("/users/logout", { refreshToken });
};
