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
    client: User;
}

export async function getReservations(token?: string): Promise<ReservationDTO[]> {
    try {
        const response = await axios.get<ReservationDTO[]>(BASE_URL, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservas:", error);
        throw error;
    }
}

export async function getReservationsByClient(clientId: string, token?: string): Promise<ReservationDTO[]> {
    try {
        const response = await axios.get<ReservationDTO[]>(`${BASE_URL}/client/${clientId}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservas por cliente:", error);
        throw error;
    }
}

export async function getReservationById(id: string): Promise<ReservationDTO> {
    try {
        const response = await axios.get<ReservationDTO>(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la reserva por ID:", error);
        throw error;
    }
}

export async function createReservation(r: Omit<Reservation, 'id'>): Promise<Reservation> {
    try {
        const response = await axios.post<Reservation>(BASE_URL, r);
        return response.data;
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        throw error;
    }
}

export async function updateReservation(id: string, service: Partial<Omit<Reservation, 'id'>>): Promise<Reservation> {
    try {
        const response = await axios.put<Reservation>(`${BASE_URL}/${id}`, service);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        throw error;
    }
}

export async function deleteReservation(id: string, token?: string): Promise<void> {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        throw error;
    }
}

export async function getReservationsByHairdresser(hairdresserId: string, token?: string): Promise<ReservationDTO[]> {
    try {
        const response = await axios.get<ReservationDTO[]>(`${BASE_URL}/hairdresser/${hairdresserId}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservas por peluquero:", error);
        throw error;
    }
}

