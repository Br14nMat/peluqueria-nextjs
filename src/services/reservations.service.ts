import axios from "axios";

export async function getReservations(token: string) {
  const response = await axios.get("/api/reservations", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteReservation(reservationId: string, token: string) {
  await axios.delete(`/api/reservations/${reservationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
