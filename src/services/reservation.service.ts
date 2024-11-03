import axios from 'axios';

const BASE_URL = `${process.env.BACKEND_URL}/reservation`;

export interface Reservation {
    id: string;
    reservationDate: Date;
    serviceDate: Date;
    status: string;
    hairdresserId: string;
    serviceId: string;
    clientId: string;
}

export async function getReservations(token?: string): Promise<Reservation[]> {

    const response = await axios.get<Reservation[]>(BASE_URL, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getReservationById(id: string): Promise<Reservation> {
    const response = await axios.get<Reservation>(`${BASE_URL}/${id}`);
    return response.data;
}

export async function createReservation(r: Omit<Reservation, 'id'>): Promise<Reservation> {
    const response = await axios.post<Reservation>(BASE_URL, r);
    return response.data;
}

export async function updateReservation(id: string, service: Partial<Omit<Reservation, 'id'>>): Promise<Reservation> {
    const response = await axios.put<Reservation>(`${BASE_URL}/${id}`, service);
    return response.data;
}

export async function deleteHaidresser(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
}
