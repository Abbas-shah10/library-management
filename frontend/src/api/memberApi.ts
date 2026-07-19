import api from "./axiosInstance";

interface PropsPayload {
  email: string;
  phone: string;
  address: string;
  membership_date: string;
  membership_type: string;
  max_books_allowed: string;
}

export const createMember = async (payload: PropsPayload) => {
  const { data } = await api.post(`/members`, payload);
  console.log(data);
  return data;
};

export const fetchAllMembers = async () => {
  const { data } = await api.get("/members");
  return data;
};

export const deleteMember = async (memberId: number) => {
  await api.delete(`/members/${memberId}`);
};

export const updateMember = async (id: number, payload: PropsPayload) => {
  const { data } = await api.put(`/members/${id}`, payload);
  return data;
};

export const fetchMemberById = async (memberId: number) => {
  const { data } = await api.get(`/members/${memberId}`);
  return data;
};
