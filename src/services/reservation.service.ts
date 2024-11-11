import { User } from '@/interface/user';
import axios from 'axios';
import { Service } from './services.service';

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

export interface ReservationDTO {
    id: string;
    reservationDate: Date;
    serviceDate: Date;
    status: string;
    hairdresser: User;
    service: Service;
    client: User
}
  

export async function getReservations(token?: string): Promise<ReservationDTO[]> {

    const response = await axios.get<ReservationDTO[]>(BASE_URL, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}


export async function getReservationsByClient(clientId : string, token?: string): Promise<ReservationDTO[]> {
    const response = await axios.get<ReservationDTO[]>(`${BASE_URL}/client/${clientId}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getReservationById(id: string): Promise<ReservationDTO> {
    const response = await axios.get<ReservationDTO>(`${BASE_URL}/${id}`);
    return response.data;
}

export async function createReservation(r: Omit<Reservation, 'id'>, token?: string): Promise<Reservation> {
    const response = await axios.post<Reservation>(BASE_URL, r, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}

export async function updateReservation(id: string, service: Partial<Omit<Reservation, 'id'>>): Promise<Reservation> {
    const response = await axios.put<Reservation>(`${BASE_URL}/${id}`, service);
    return response.data;
}

export async function deleteReservation(id: string, token?: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}

// Obtener reservas por peluquero
export async function getHairdresserReservations(hairdresserId: string, token?: string): Promise<ReservationDTO[]> {
    const response = await axios.get<ReservationDTO[]>(`${BASE_URL}/hairdresser/${hairdresserId}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}

// Marcar reserva como completada
export async function markReservationAsCompleted(id: string, token?: string): Promise<Reservation> {
    const response = await axios.patch<Reservation>(`${BASE_URL}/${id}/complete`, {}, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}

// Obtener reservas por estado
export async function getReservationsByStatus(status: string, token?: string): Promise<ReservationDTO[]> {
    const response = await axios.get<ReservationDTO[]>(`${BASE_URL}/status/${status}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}

