import api from "./axiosInstance";

export const fetchAllReservation = async () => {
  const { data } = await api.get("/reservations");
  return data;
};

export const cancelReservation = async (reservationId: number) => {
  const { data } = await api.patch(`/reservations/${reservationId}/cancel`);
  return data;
};

export const fulfillReservation = async (reservationId: number) => {
  const { data } = await api.patch(`/reservations/${reservationId}/fulfill`);
  return data;
};
